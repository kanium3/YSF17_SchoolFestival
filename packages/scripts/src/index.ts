/**
 * Copyright 2022 Google LLC
 * Copyright 2025 latimeria Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { authenticate } from '@google-cloud/local-auth'
import { GoogleAuth, OAuth2Client, BaseExternalAccountClient } from 'google-auth-library'
import { google, drive_v3 } from 'googleapis'
import crypto from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import PouchDB from 'pouchdb'

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive']
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json'
const CREDENTIALS_PATH = 'credentials.json'
const POUCHDB_DBNAME = 'latimeriadb'
const DEFAULT_SYNC_FILE_REGEXP = /^\.*?/

interface SyncFileSchema {
  _rev?: string
  _id: string
  hash: string
  date: string
}

interface SyncAgentOptions {
  folderID: string
  matchRule: RegExp
  force: boolean
  realSyncPath: string
}

/**
 * 実行されているディレクトリから絶対パス���������取得
 */
function resolve_path_from_cwd(absolve_path: string): string {
  return path.join(process.cwd(), absolve_path)
}

/**
 * Reads previously authorized credentials from the save file.
 */
async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | undefined> {
  try {
    const content = await fs.readFile(TOKEN_PATH, { encoding: 'utf8' })
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials) as OAuth2Client
  }
  catch (error) {
    console.error(error)
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 */
async function saveCredentials(client: OAuth2Client): Promise<void> {
  const content = await fs.readFile(CREDENTIALS_PATH, { encoding: 'utf8' })
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 */
export async function authorize(): Promise<OAuth2Client> {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  }) as OAuth2Client
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

/**
 * Load or request or authorization to call APIs.
 */
export async function authorizeAuto(): Promise<OAuth2Client | BaseExternalAccountClient> {
  const auth = new GoogleAuth({
    scopes: SCOPES,
  })
  return auth.getClient() as Promise<OAuth2Client | BaseExternalAccountClient>
}

class SyncAgent {
  private options: SyncAgentOptions
  private db: PouchDB.Database<SyncFileSchema>

  constructor(options: SyncAgentOptions) {
    this.options = options
    this.db = new PouchDB(POUCHDB_DBNAME)
  }

  async setup(): Promise<void> {
    const fileList = await fs.readdir(this.options.realSyncPath, {
      withFileTypes: true,
    })

    const filteredFileList: string[] = []
    for await (const dirent of fileList) {
      if (!dirent.isFile()) {
        continue
      }
      if (this.options.matchRule.test(dirent.name)) {
        filteredFileList.push(dirent.name)
      }
    }

    for (const filePath of filteredFileList) {
      const content = await fs.readFile(
        path.join(this.options.realSyncPath, filePath),
      )
      const hash = crypto.createHash('sha256').update(new Uint8Array(content)).digest('hex')

      try {
        const localFileInfo = await this.db.get(filePath)
        const document_: SyncFileSchema = {
          _id: filePath,
          hash: hash,
          date: new Date().toISOString(),
          _rev: localFileInfo._rev,
        }
        await this.db.put(document_)
      }
      catch {
        const document_: SyncFileSchema = {
          _id: filePath,
          hash: hash,
          date: new Date().toISOString(),
        }
        await this.db.put(document_)
      }
    }
  }

  async sync(drive: drive_v3.Drive): Promise<void> {
    const files = await drive.files.list({
      q: `'${this.options.folderID}' in parents`,
      fields: 'files(id, name, sha256Checksum)',
    })

    if (!files.data.files) {
      return
    }

    for (const file of files.data.files) {
      if (!file.name || !file.id) continue

      try {
        const localFileInfo = await this.db.get(file.name)
        if (localFileInfo.hash !== file.sha256Checksum) {
          const GFileData = await drive.files.get({
            fileId: file.id,
            supportsAllDrives: true,
            alt: 'media',
          })

          const buf = GFileData.data as unknown as Blob
          const buffer = new Uint8Array(await buf.arrayBuffer())
          await fs.writeFile(
            path.join(this.options.realSyncPath, file.name),
            buffer,
          )
        }
      }
      catch {
        const GFileData = await drive.files.get({
          fileId: file.id,
          supportsAllDrives: true,
          alt: 'media',
        })

        const buf = GFileData.data as unknown as Blob
        const buffer = new Uint8Array(await buf.arrayBuffer())
        await fs.writeFile(
          path.join(this.options.realSyncPath, file.name),
          buffer,
        )
      }
    }
  }
}

/**
 * The handler
 */
export async function driveHandler(
  authClient: OAuth2Client | BaseExternalAccountClient,
  syncDirectory: string | undefined,
  driveId: string,
  force: boolean,
): Promise<void> {
  const drive = google.drive({ version: 'v3', auth: authClient })
  const resolveSyncDirectory = syncDirectory ?? resolve_path_from_cwd('/public')
  const agent = new SyncAgent({
    folderID: driveId,
    force: force,
    matchRule: DEFAULT_SYNC_FILE_REGEXP,
    realSyncPath: resolveSyncDirectory,
  })
  await agent.setup()
  await agent.sync(drive)
}

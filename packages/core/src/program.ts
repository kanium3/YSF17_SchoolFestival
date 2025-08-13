import * as v from 'valibot'
import { tokenize, getTokenizer } from 'kuromojin'
import { Token } from './token'
import { hasOnlyKatakana, hasOnlyKanji, hasOnlyHiragana, kanaToHira, hasKatakana, hasKanji } from '@/app/lib/search-utilities'

export const programType = {
  workshop: '体験',
  donation: '募金',
  sale: '販売',
  exhibition: '展示',
  performance: 'パフォーマンス',
  publishing: '出版',
  other: 'その他',
} as const

export const ariaType = {
  '1F': '1F',
  '2F': '2F',
  '3F': '3F',
  '4F': '4F',
  '5F': '5F',
  'hall': 'ホール',
  'cafeteria': 'カフェテリア',
  'gym': '体育館',
  'rooftop': '屋上',
} as const

export const programOptionsSchema = v.objectWithRest({
  room: v.pipe(v.optional(v.string()), v.description('SVG上の部屋ID')),
  imagePath: v.optional(v.string()),
}, v.string())

export const programSchema = v.object({
  id: v.pipe(v.string(), v.nonEmpty(), v.slug()),
  name: v.pipe(v.string(), v.nonEmpty()),
  team: v.pipe(v.string(), v.nonEmpty()),
  programType: v.array(v.enum(programType)),
  aria: v.enum(ariaType),
  location: v.pipe(v.string(), v.nonEmpty(), v.description('教室や部屋の番号')),
  prText: v.optional(v.pipe(v.string(), v.nonEmpty())),
  tag: v.optional(v.array(v.pipe(v.string(), v.maxLength(20), v.description('企画に結びつくタグ')))),
  dates: v.pipe(v.array(v.pipe(v.string(), v.isoDate())), v.minLength(0), v.maxLength(3), v.description('企画を開催する日付の配列')),
  options: v.pipe(v.optional(programOptionsSchema), v.description('企画のオプション情報。SVGのIDや画像パスなどの内部的な情報を含みます')),
})

export type ProgramData = v.InferInput<typeof programSchema>
export type ProgramDataOptions = v.InferOutput<typeof programOptionsSchema>

// Tagsクラス
export class Tags extends Set<string> {
  constructor(init: string[]) {
    super(init)
  }

  // 指定したタグ集合がこの集合のスーパーセットか判定
  isSupersetOf(other: Tags): boolean {
    for (const tag of other) {
      if (!this.has(tag)) return false
    }
    return true
  }

  // 指定したタグ集合とこの集合が互いに素か判定
  isDisjointFrom(other: Tags): boolean {
    for (const tag of other) {
      if (this.has(tag)) return false
    }
    return true
  }
}

// Programクラス
export class Program {
  id: string
  name: string
  team: string
  location: string
  aria: string
  programType: string[]
  prText?: string
  optionalTag?: string[]
  dates: Date[]
  options?: ProgramDataOptions

  constructor(option: ProgramData) {
    this.id = option.id
    this.name = option.name
    this.team = option.team
    this.location = option.location
    this.aria = option.aria
    this.programType = option.programType
    this.prText = option.prText
    this.optionalTag = option.tag
    this.dates = option.dates.map(v => new Date(v))
    this.options = option.options
  }

  /**
   * 企画に結びつくタグを返します。
   */
  get tags(): Tags {
    return new Tags([
      ...this.programType,
      this.aria,
      this.location,
      ...(this.optionalTag || []),
    ])
  }
}

// Programsクラス
export class Programs {
  programs: Set<Program>

  constructor(init?: Program[]) {
    this.programs = init ? new Set(init) : new Set()
  }

  /**
   * 以下の結果をANDして適する企画を返します。
   * @param programTypes 「体験」「募金」など。AND検索
   * @param areaTypes 階/ホールなど OR検索
   * @param tagsAndNames ハッシュタグ、企画名 AND検索
   * @param yomiganaSerch ハッシュタグ、企画名の読み仮名検索
   * @param conjugatedWordSearch ~~ハッシュタグ、企画名の活用語を考慮した検索~~ yahooを使わないと無理なので保留
   */
  // matchPrograms(tags: Tags, is_complete: boolean = false): Programs {
  //  const matchedPrograms = new Programs([])
  //  for (const program of this.programs) {
  //    const programTags = program.tags
  //    if (is_complete && tags.isSupersetOf(programTags)) {
  //      matchedPrograms.programs.add(program)
  //      continue
  //    }
  //    if (!tags.isDisjointFrom(programTags)) {
  //      matchedPrograms.programs.add(program)
  //    }
  //  }
  //  return matchedPrograms
  // }

  matchPrograms(programTypes: string[], areaTypes: string[], tagsAndNames: string[], yomiganaSerch: boolean, _conjugatedWordSearch: boolean): Programs {
    let matchedProgramsResult = new Programs([])
    let temporaryResult = new Programs()

    // programTypes AND
    if (programTypes.length > 0) {
      const result = new Programs()
      for (const program of this.programs) {
        let matched = true
        for (const programType of programTypes) {
          if (!program.programType.includes(programType)) {
            matched = false
            break
          }
        }
        if (matched)
          result.programs.add(program)
      }
      temporaryResult = result
    }
    else {
      for (const program of this.programs) temporaryResult.programs.add(program)
    }

    // areaTypes OR
    if (areaTypes.length > 0) {
      const result = new Programs()
      for (const program of temporaryResult.programs) {
        if (areaTypes.includes(program.aria)) {
          result.programs.add(program)
          continue
        }
      }
      temporaryResult = result
    }
    else {
      for (const program of temporaryResult.programs) temporaryResult.programs.add(program)
    }

    // tagsAndNames AND
    getTokenizer().then((_tokenizer) => {
    // kuromoji.js's `tokenizer` instance
    })

    if (tagsAndNames.length > 0) {
      const result = new Programs()
      for (const program of temporaryResult.programs) {
        let matched = true
        
        console.log(analyzer("緑").map(item => kanaToHira(item.reading)).join(''))

        let programName
        let tags = ""
        if (yomiganaSerch) { // 読み仮名検索をする場合
          programName = analyzer(program.name).map(item => kanaToHira(item.reading)).join('')
          // tags = [...program.tags].map(item => analyzer(item).map(item => kanaToHira(item.reading)).join(''))
        }
        else {
          programName = program.name
          // tags = [...program.tags]
        }

        for (const tagOrName of tagsAndNames) {
          if (hasOnlyKanji(tagOrName) || hasOnlyKatakana(tagOrName)) {
            if (!tags.includes(analyzer(tagOrName).map(item => kanaToHira(item.reading)).join('')) && !programName.includes(analyzer(tagOrName).map(item => kanaToHira(item.reading)).join('')) && !programName.includes(tagOrName) && !tags.includes(tagOrName)) {
              matched = false
              break
            }
          }
          else if (hasKatakana(tagOrName) || hasKanji(tagOrName)) {
            if (!analyzer(tags).map(item => kanaToHira(item.reading)).join('').includes(analyzer(tagOrName).map(item => kanaToHira(item.reading)).join('')) && !analyzer(programName).map(item => kanaToHira(item.reading)).join('').includes(analyzer(tagOrName).map(item => kanaToHira(item.reading)).join(''))) {
              matched = false
              break
            }
          }
          else if (hasOnlyHiragana(tagOrName)) {
            if (!analyzer(tags).map(item => kanaToHira(item.reading)).join('').includes(tagOrName) && !analyzer(programName).map(item => kanaToHira(item.reading)).join('').includes(tagOrName)) {
              matched = false
              break
            }
          }
          else {
            if (!tags.includes(tagOrName) && !programName.includes(tagOrName)) {
              matched = false
              break
            }
          }
        }
        if (matched)
          result.programs.add(program)
      }
      temporaryResult = result
    }
    else {
      for (const program of temporaryResult.programs) temporaryResult.programs.add(program)
    }

    matchedProgramsResult = temporaryResult

    return matchedProgramsResult
  }

  /**
   * 企画のイテレータを返します。
   */
  iter(): IterableIterator<Program> {
    return this.programs.values()
  }
}

/**
 * 企画データのJSONをパースします
 */
export function parseProgramsData(input: string): Programs {
  const programsSchema = v.array(programSchema)
  const data = v.parse(programsSchema, input)
  return new Programs(data.map(programData => new Program(programData)))
}

function analyzer(text: string): Token[] {
  const tokens: Token[] = []
  tokenize(text).then((item) => {
    tokens.push(new Token(item))
  })
  return tokens.map(token => new Token(token))
}

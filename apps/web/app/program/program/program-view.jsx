import { ariaType } from '@latimeria/core'
import styles from './program-view.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { solveBasePath } from '@/app/lib/index.js'
import Tags from '@/app/program/program/tags.jsx'
import { useAtom } from 'jotai'
import { searchQueryAtom, programs } from '@/app/program/program/atoms'
import { useEffect, useState } from 'react'

/** @type {string[]} */
const ariaOrder = Object.values(ariaType)

function groupArray(array) {
  const groups = {}
  for (const item of array) {
    if (!groups[item.aria]) {
      groups[item.aria] = []
    }
    groups[item.aria].push(item)
  }
  return Object.entries(groups).map(([aria, item]) => ({ aria, item }))
}

async function searchPrograms(loc) {
  let result

  console.log('searchPrograms called with loc:', loc)

  // kindを取得
  const kind = loc.searchParams?.get('kind') == undefined ? [] : loc.searchParams?.get('kind').split(' ')
  // placeを取得
  const place = loc.searchParams?.get('place') == undefined ? [] : loc.searchParams?.get('place').split(' ')
  // 文字列検索(q)を取得
  const q = loc.searchParams?.get('q') == undefined ? [] : loc.searchParams?.get('q').split(' ')

  result = await programs.matchPrograms(kind, place, q)

  const programsResult = result

  return programsResult
}

export default function ProgramView() {
  // ** @type {import("@latimeria/core").Programs} */
  // const programs = searchPrograms()// useAtomValue(matchedProgramsAtom)

  const [loc] = useAtom(searchQueryAtom)
  const [programsResult, setProgramsResult] = useState(null)

  useEffect(() => {
    console.log('useEffect called with loc:', loc)
    async function fetchPrograms() {
      const result = await searchPrograms(loc)
      setProgramsResult(result)
    }
    fetchPrograms()
  }, [/* dependencies if needed */loc])
  // if (!programsResult) return <div>Loading...</div>
  console.log(programsResult)

  const ite = programsResult.iter()
  const programsArray = [...ite].sort((a, b) => ariaOrder.indexOf(a.aria) - ariaOrder.indexOf(b.aria))
  /** @type {[{aria:string , item:Program[]}]} */
  const ariaGroups = groupArray(programsArray)
  return (
    <div className={styles.list}>
      {ariaGroups.map(({ aria, item }, index) => {
        return (
          <div key={`${aria}-${index}`}>
            <h2 key={`${aria}-${index}`}>{aria || ''}</h2>
            <ol>
              {item.map((program) => {
                return (
                  <li key={program.id}>
                    <Link href={`/program/${program.id}`}>
                      <div className={styles.card}>
                        <div className={styles.cardTitle}>
                          <div className={styles.imageInCard}>
                            <Image src={solveBasePath('/latimeria_logo.png')} alt="仮企画ロゴです" fill={true} />
                          </div>
                          <div className={styles.cardDescription}>
                            <h2>{program.name}</h2>
                            <p className={styles.cardPRText}>{program.prText || ''}</p>
                            <div className={styles.cardTags}>
                              {program.optionalTag === undefined
                                ? ''
                                : program.optionalTag.map(tag => (
                                    <span key={tag} className={styles.cardTag}>
                                      #
                                      {tag}
                                    </span>
                                  ))}
                            </div>
                          </div>
                        </div>
                        <div className={styles.cardPlaceAndType}>
                          <p>
                            {program.aria}
                            @
                            {program.location}
                          </p>
                          <Tags tags={program.programType} />
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </div>
        )
      })}
    </div>
  )
}

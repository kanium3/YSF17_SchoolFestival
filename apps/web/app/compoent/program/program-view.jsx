import styles from './program-view.module.css'
import Link from 'next/link'
import Image from 'next/image'

/**
 *
 * @param {import("@latimeria/core").Programs} programs
 * @constructor
 */
export default function ProgramView({ programs }) {
  const programsArray = [...programs.iter()]
  return (
    <div className={styles.list}>
      <ol>
        {programsArray.map((program) => {
          return (
            <li key={program.id}>
              <Link href={`/program/${program.id}`}>
                <div className={styles.card}>
                  <div className={styles.cardTitle}>
                    <div className={styles.imageInCard}>
                      <Image src="/latimeria_logo.png" alt="仮企画ロゴです" fill={true} />
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
                    {program.programType.map((programType) => {
                      const [backgroundColor, textColor] = backgroundAndTextColor(programType)
                      const textStyle = {
                        background: backgroundColor,
                        color: textColor,
                      }
                      return <span key={programType} className={styles.cardProgramType} style={textStyle}>{programType}</span>
                    })}
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/**
 * `tag`に応じて背景色と文字色を返す関数
 * @param {string} tag
 * @return {string[]} `[backgroundColor, textColor]`
 */
function backgroundAndTextColor(tag) {
  switch (tag) {
    case '体験': {
      return ['#F63838', '#ffffff']
    }
    case '展示': {
      return ['#387AF6', '#ffffff']
    }
    case '配布': {
      return ['#1CCB45', '#ffffff']
    }
    case '上演': {
      return ['#B038F6', '#ffffff']
    }
    case '販売': {
      return ['#F2F46D', '#323232']
    }
    case '募金': {
      return ['#91F46D', '#323232']
    }
    default: {
      return ['#ffffff', '#323232']
    }
  }
}

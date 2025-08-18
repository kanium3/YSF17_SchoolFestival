import styles from './tags.module.css'

/**
 * tagを一覧で返す関数 (単体でないことに注意)
 * @param {string[]} tags program.programType
 * @returns {JSX.Element}
 */
export default function Tags({ tags }) {
  return (
    <>
      {tags.map(tag => (
        <Tag tag={tag} key={tag}></Tag>
      ))}
    </>
  )
}

/**
 * tag単体を返す関数
 * @param {string} tag
 * @returns {JSX.Element}
 */
export function Tag({ tag }) {
  const [bgColor, textColor] = BackAndFrontColor(tag)
  return (
    <span className={styles['tag']} style={{ backgroundColor: bgColor, color: textColor }}>
      {tag}
    </span>
  )
}

/**
 * `tag`に応じて背景色と文字色を返す関数
 * @param {string} tag
 * @returns {string[]} `[bgColor, textColor]`
 */
function BackAndFrontColor(tag) {
  switch (tag) {
    case '体験': {
      return ['#F63838', '#fcfcff']
    }
    case '展示': {
      return ['#387AF6', '#fcfcff']
    }
    case '配布': {
      return ['#1CCB45', '#fcfcff']
    }
    case '上演': {
      return ['#B038F6', '#fcfcff']
    }
    case '販売': {
      return ['#F2F46D', '#323232']
    }
    default: {
      return ['#fcfcfc', '#323232']
    }
  }
}

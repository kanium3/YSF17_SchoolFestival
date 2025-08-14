import { NavLink } from 'react-router'
import styles from './home-article-box.module.css'

export default function HomeArticleBox({ data, keyValue }) {
  /** @type {Date} */
  const date = data.date

  return (
    <NavLink href={data.link} key={keyValue} className={styles.boxLink}>
      <div className={styles.box}>
        <div className={styles.boxTitles}>
          <h3 className={styles.boxArticleTitle}>{data.title}</h3>
          <p className={styles.boxArticleDate}>{`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日投稿`}</p>
        </div>
        <div className={styles.boxImage}>
          <img className={styles.image} src="/kari-fallback.png" alt={`${data.title}のサムネイル`} />
        </div>
      </div>
    </NavLink>
  )
}

'use client'
import style from './feature-card.module.css'
import { NavLink } from 'react-router'

/**
 * @param {{ [p:string]: any }} data
 * @param {string} key
 * @return {JSX.Element}
 * @constructor
 */
export default function FeatureCard({ data, key }) {
  /** @type {Date} */
  const date = data.date
  /** @type {string[]} */
  const tags = data.tags
  const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  return (
    <NavLink to={data.link} className={style.cardLink} key={key}>
      <div key={key} className={style.card}>
        <div className={style.cardHeader}>
          <img src={data.image ?? '/kari-fallback.png'} alt="特集のイメージ画像" />
          <div className={style.cardHeaderTags}>
            {tags.map(tag => (
              <span key={tag} className={style.cardHeaderTag}>
                #
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className={style.cardTitle}>
          <h3>{data.title}</h3>
        </div>
        <div className={style.cardDate}>
          <p>{formattedDate}</p>
        </div>
      </div>
    </NavLink>
  )
}

'use client'
import Link from 'next/link'
import style from './feature-card.module.css'

/**
 * @param {{ [p:string]: any }} data
 * @param {string} key
 * @return {JSX.Element}
 * @constructor
 */
export default function FeatureCard({ data, key }) {
  return (
    <div key={key} className={style.card}>
      <Link href={data.link} className={style.cardLink}>
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </Link>
    </div>
  )
}

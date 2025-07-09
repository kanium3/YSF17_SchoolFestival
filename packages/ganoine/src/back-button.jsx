'use client'

/* 帯としての可認識性を付与するためにページのカラーを少し暗くした背景色か(上)下の枠線が欲しいかもしれない */
import styles from './back-button.module.css'
import { Link } from 'react-aria-components'
import { IoChevronBackOutline } from 'react-icons/io5'

/**
 * 左上の矢印戻るボタン
 * @param {Object} props
 * @param {string} props.to - 戻る先のパス
 * @param {string} props.arrowColor - 矢印の色
 * @returns {JSX.Element}
 */
export function BackButton({ to, arrowColor }) {
  return (
    <Link href={to} className={styles['back-button']}>
      <IoChevronBackOutline size={44} color={arrowColor} />
    </Link>
  )
}

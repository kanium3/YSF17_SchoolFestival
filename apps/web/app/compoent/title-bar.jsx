'use client'
/* 帯としての可認識性を付与するためにページのカラーを少し暗くした背景色か(上)下の枠線が欲しいかもしれない */
import styles from './title-bar.module.css'
import { useRouter } from 'next/navigation'
import { IoChevronBackOutline } from 'react-icons/io5'

/**
 * 上部の戻るボタン＋ページ名
 * @param {string} pagename - ページ名
 * @param {string} themeColor - テーマカラー
 * @returns {JSX.Element}
 */
export default function TitleBarWithBack({
  pagename = '無題',
  themeColor,
}) {
  return (
    <header className={styles['title-bar']}>
      <BackButton arrowColor={themeColor} />
      <div
        className={styles['page-title']}
        style={{
          color: themeColor,
          fontSize: Math.min(Math.max(24, 320 / pagename.length), 32),
        }}
      >
        {pagename}
      </div>
    </header>
  )
}

/**
 * 左上の矢印戻るボタン
 * @param {string} to - 戻る先のパス
 * @param {string} arrowColor - 矢印の色
 * @returns {JSX.Element}
 */
function BackButton({ arrowColor }) {
  const router = useRouter()
  return (
    <span onClick={() => router.back()} role="link" className={styles['back-button']}>
      <IoChevronBackOutline size={44} color={arrowColor} />
    </span>
  )
}

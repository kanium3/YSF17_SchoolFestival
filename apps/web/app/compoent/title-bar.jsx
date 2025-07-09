'use client'

/* 帯としての可認識性を付与するためにページのカラーを少し暗くした背景色か(上)下の枠線が欲しいかもしれない */
import styles from './title-bar.module.css'
import { BackButton } from '@latimeria/ganoine'

/**
 * 上部の戻るボタン＋ページ名
 * @param {Object} props
 * @param {string} props.backpage - 戻る先のパス
 * @param {string} props.pagename - ページ名
 * @param {string} props.themeColor - テーマカラー
 * @returns {JSX.Element}
 */
export default function TitleBarWithBack({
  backpage = '/',
  pagename = '無題',
  themeColor,
}) {
  return (
    <header className={styles['title-bar']}>
      <BackButton to={backpage} arrowColor={themeColor} />
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

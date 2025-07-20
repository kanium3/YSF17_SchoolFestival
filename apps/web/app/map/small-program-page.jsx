import { useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'

import styles from './small-program-page.module.css'

const handleContentClick = (event) => {
  event.stopPropagation()
}

export default function ProgramPopup({ title, url, images, area, place, text }) {
  const [isDisplayPage, setDisplayPage] = useState(false)

  function handleclick() {
    setDisplayPage(!isDisplayPage)
  }
  return (
    <div>
      <label className={styles.popupOpenButton}>
        <button type="button" onClick={handleclick} />
        {title + 'のポップアップを開く'}
      </label>
      {
        isDisplayPage && createPortal(
          <div className={styles.backdrop} onClick={handleclick}>
            <div className={styles.main} onClick={handleContentClick}>
              <label className={styles.popupCloseButton}>
                <button type="button" onClick={handleclick} />
                ✕
              </label>
              <div className={styles.content}>
                <h1>{ title }</h1>
                <Image src={images} alt="サンプルPR画像" width={100} height={100} />
                <p className={styles.area}>{area + '@' + place }</p>
                <p className={styles.prText}>{ text }</p>
                <Link href={`/program/${url}`} className={styles.link}>
                  <span>
                    この企画の詳細ページへ
                  </span>
                </Link>
              </div>
            </div>
          </div>,
          document.body,
        )
      }
    </div>
  )
}

import styles from './image-button.module.css'
import { useEffect, useRef, useState } from 'react'
import { MdNavigateNext } from 'react-icons/md'
import { NavLink } from 'react-router'

/**
 * 画像を主体としたボタンのようなリンク
 * @param name 表示される文字
 * @param pageUrl 遷移先URL
 * @param imageSrc 画像参照先
 * @returns
 */
export function ImageButton({ name, pageUrl, imageSrc }) {
  const bodyReference = useRef(null)
  const [imageWidth, setImageWidth] = useState(1)

  useEffect(() => {
    setImageWidth(bodyReference.current.offsetWidth)
  }, [])

  return (
    <div className={`${styles.imagebutton} bigButton`} ref={bodyReference}>
      <NavLink to={pageUrl}>
        <img
          src={imageSrc}
          alt={`いい感じの${name}の画像`}
          width={imageWidth}// 560
          height={imageWidth * 33 / 56}// 330
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.imagebuttonImage}></div>
        <div className={styles.imagebuttonTexts}>
          <h1>{name}</h1>
          <MdNavigateNext className={styles.rightArrow} />
        </div>
      </NavLink>
    </div>
  )
}

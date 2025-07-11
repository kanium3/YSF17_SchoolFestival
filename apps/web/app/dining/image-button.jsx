'use client'

import styles from './page.module.css'
import { solveBasePath } from '@/app/lib/index.js'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export function ImageButton(property) {
  const bodyReference = useRef(null)
  const [Width, setWidth] = useState(1)

  useEffect(() => {
    setWidth(bodyReference.current.offsetWidth)
  }, [])

  return (
    <div className={styles.imagebutton} ref={bodyReference}>
      <Link href={solveBasePath(property.pageUrl)}>
        <Image
          src={solveBasePath(property.imageSrc)}
          alt={`いい感じの${property.name}の画像`}
          width={Width}// 560
          height={Width * 33 / 56}// 330
          style={{ objectFit: 'cover' }}
        />
        <div className={styles.imagebuttonImage}></div>
        <h1>{property.name}</h1>
      </Link>
    </div>
  )
}

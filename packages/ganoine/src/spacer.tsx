'use client'

import styles from './spacer.module.css'
import type { ReactNode } from 'react'

export type SpaceKinds = 'S' | 'M' | 'L' | 'XL'

export function Spacer({ kind }: { kind: SpaceKinds }): ReactNode {
  let style: string
  switch (kind) {
    case 'S': {
      style = styles.s
      break
    }
    case 'M': {
      style = styles.m
      break
    }
    case 'L': {
      style = styles.l
      break
    }
    case 'XL': {
      style = styles.xl
      break
    }
  }

  return (
    <div className={style}></div>
  )
}

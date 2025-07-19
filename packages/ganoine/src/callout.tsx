'use client'

import styles from './callout.module.css'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { MdInfoOutline, MdOutlineWarningAmber } from 'react-icons/md'

export type CalloutKind = 'warn' | 'info' | 'default'

export interface CalloutProperties {
  kind?: CalloutKind
  children: ReactNode
}

/**
 * @param children
 * @param kind コールアウトの種類
 */
export function Callout({ children, kind = 'default' }: CalloutProperties) {
  const kindColor = (color: CalloutKind) => {
    switch (color) {
      case 'warn': {
        return styles.calloutWarning
      }
      case 'info': {
        return styles.calloutInfo
      }
      default: {
        return styles.calloutDefault
      }
    }
  }
  return (
    <div className={clsx(styles.callout, kindColor(kind))}>
      <CalloutIcon kind={kind} />
      {children}
    </div>
  )
}

function CalloutIcon({ kind = 'default' }: { kind?: CalloutKind }) {
  switch (kind) {
    case 'info': {
      return <span className={styles.calloutIcon}><MdInfoOutline /></span>
    }
    case 'warn': {
      return <span className={styles.calloutIcon}><MdOutlineWarningAmber /></span>
    }
    default: {
      return <span className={styles.calloutIcon}></span>
    }
  }
}

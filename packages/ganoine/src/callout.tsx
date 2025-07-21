'use client'

import styles from './callout.module.css'
import type { ComponentPropsWithRef, ReactNode } from 'react'
import { clsx } from 'clsx'
import { MdInfoOutline, MdOutlineWarningAmber } from 'react-icons/md'

export type CalloutKind = 'warn' | 'info' | 'default'

export type CalloutProperties = {
  kind?: CalloutKind
  children: ReactNode
} & Omit<ComponentPropsWithRef<'div'>, 'children'>

export function Callout(properties: CalloutProperties) {
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
    <div className={clsx(styles.callout, kindColor(properties.kind ?? 'default'), properties.className)} {...properties}>
      <CalloutIcon kind={properties.kind} />
      {properties.children}
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

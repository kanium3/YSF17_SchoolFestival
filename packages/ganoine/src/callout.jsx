'use client'

import styles from './callout.module.css'

/**
 * @typedef {"warn" | "info" | "default"} calloutKind コールアウトの種類
 */

/**
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {calloutKind} [props.kind="default"] コールアウトの種類
 * @constructor
 */
export function Callout({ children, kind = 'default' }) {
  return (
    <div className={styles.callout}>
      <CalloutIcon kind={kind} />
      {children}
    </div>
  )
}

/**
 *
 * @param {calloutKind} [kind="default"]
 * @constructor
 */
function CalloutIcon({ kind = 'default' }) {
  switch (kind) {
    case 'info': {
      return <span className={styles.calloutIcon}>💡</span>
    }
    case 'warn': {
      return <span className={styles.calloutIcon}>⚠️</span>
    }
    default: {
      return <span className={styles.calloutIcon}></span>
    }
  }
}

'use client'

import type { ComponentPropsWithRef, ReactNode } from 'react'
import { type LinkProps as AriaLinkProperties, Link as AriaLink } from 'react-aria-components'
import styles from './link.module.css'
import { MdOpenInNew } from 'react-icons/md'

export type LinkKind = 'external' | 'internal' | 'default'

export type LinkProperties = {
  kind?: LinkKind
  children: ReactNode
} & Omit<ComponentPropsWithRef<'a'>, 'children'>
& Omit<AriaLinkProperties, 'children'>

/**
 * ## Ganoineのリンクコンポーネント
 * `react-aria-components`の`Link`コンポーネントを使用して、アクセシブルなリンクを提供します。
 */
export function Link(properties: LinkProperties): ReactNode {
  return (
    <AriaLink
      {...properties}
      className={`${styles.link} ${properties.className}`}
    >
      {properties.children}
      {
        (properties.kind ?? 'default') == 'external' ? <MdOpenInNew /> : <></>
      }
    </AriaLink>
  )
}

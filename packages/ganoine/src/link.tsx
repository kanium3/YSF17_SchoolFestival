'use client'

import { type ComponentPropsWithRef, type ReactNode, useRef } from 'react'
import { type LinkProps as AriaLinkProperties, Link as AriaLink } from 'react-aria-components'
import styles from './link.module.css'
import { MdOpenInNew } from 'react-icons/md'
import { useLink } from 'react-aria'

export type LinkKind = 'external' | 'internal' | 'default'

export type LinkProperties = {
  href: string
  kind?: LinkKind
  children: ReactNode
} & Omit<ComponentPropsWithRef<'a'>, 'children'>
& Omit<AriaLinkProperties, 'children'>

/**
 * ## Ganoineのリンクコンポーネント
 * `react-aria-components`の`Link`コンポーネントを使用して、アクセシブルなリンクを提供します。
 */
export function Link(properties: LinkProperties): ReactNode {
  const reference = useRef(null)
  const { linkProps } = useLink(properties, reference)
  return properties.kind === 'external'
    ? (
        <a
          {...linkProps}
          href={properties.href}
          className={`${styles.link} ${properties.className}`}
          target="_blank"
          rel="noopener noreferrer"
          ref={reference}
        >
          {properties.children}
          <MdOpenInNew />
        </a>
      )
    : (
        <AriaLink
          {...properties}
          className={`${styles.link} ${properties.className}`}
        >
          {properties.children}
        </AriaLink>
      )
}

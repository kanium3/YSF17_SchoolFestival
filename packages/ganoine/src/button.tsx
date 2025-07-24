'use client'

import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Button as AriaButton, ButtonProps as AriaButtonProperties } from 'react-aria-components'
import styles from './button.module.css'

export type ButtonKinds = 'primary' | 'danger'

export type ButtonProperties = {
  children: ReactNode
  disabled?: boolean
  kind?: ButtonKinds
} & Omit<ComponentPropsWithRef<'button'>, 'children'> & Omit<AriaButtonProperties, 'children'>

export function Button(properties: ButtonProperties): ReactNode {
  return (
    <AriaButton
      {...properties}
      ref={properties.ref}
      className={styles.ganoineButton}
      data-disabled={properties.disabled ? 'true' : 'false'}
      data-kind={properties.kind}
    >
      {properties.children}
    </AriaButton>
  )
}

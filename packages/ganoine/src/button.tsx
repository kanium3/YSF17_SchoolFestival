'use client'

import type { ComponentPropsWithRef, ReactNode, ElementType } from 'react'
import { Button as AriaButton, ButtonProps as AriaButtonProperties } from 'react-aria-components'
import styles from './button.module.css'

export type ButtonKinds = 'primary' | 'danger'

export type ButtonProperties<T extends ElementType = typeof AriaButton> = {
  children: ReactNode
  disabled?: boolean
  kind?: ButtonKinds
  component?: T
} & Omit<ComponentPropsWithRef<T>, 'children'> & Omit<AriaButtonProperties, 'children'>

/**
 * ## Ganoineのボタンコンポーネント
 * `component`プロパティを指定することで、任意のコンポーネントをボタンとして使用できます。
 *
 * 例えば、`component="a"`とすることで、リンクとしてのボタンを作成できます。
 * デフォルトでは、`react-aria-components`の`Button`コンポーネントが使用されます。
 *
 * `kind`プロパティを指定することで、ボタンの種類を変更できます。
 *
 * `primary`は主に使用するボタン、`danger`は危険な操作を行うボタンとして使用されます。
 *
 * `disabled`プロパティを指定することで、ボタンを無効化できます。
 **/
export function Button<T extends ElementType = typeof AriaButton>(properties: ButtonProperties<T>): ReactNode {
  const Component = (properties.component || AriaButton) as ElementType
  return (
    <Component
      {...properties}
      ref={properties.ref}
      className={styles.ganoineButton}
      data-disabled={properties.disabled ? 'true' : 'false'}
      data-kind={properties.kind}
    >
      {properties.children}
    </Component>
  )
}

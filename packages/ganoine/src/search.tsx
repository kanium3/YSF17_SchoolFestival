'use client'

import type { CSSProperties, ReactNode } from 'react'
import {
  SearchFieldProps as AriaSearchFieldProperties,
  SearchField as AriaSearchField,
  FieldError as AriaFieldError,
  Input as AriaInput,
  InputProps as AriaInputProperties,
  Label as AriaLabel,
} from 'react-aria-components'
import styles from './search.module.css'

export type SearchProperties = {
  children: ReactNode
  label?: string
  defaultValue?: string
  name?: string
  description?: string
  isRequired?: boolean
  isDisabled?: boolean
  className?: string
  style?: CSSProperties
} & Omit<AriaSearchFieldProperties, 'children' | 'label' | 'defaultValue' | 'name' | 'description' | 'isRequired' | 'isDisabled'>

/**
 * ## Ganoineの検索フィールドコンポーネント
 * `react-aria-components`の`SearchField`コンポーネントを使用して、アクセシブルな検索フィールドを提供します。
 *
 * - `label`: 検索フィールドのラベルを指定します。
 * - `defaultValue`: 検索フィールドの初期値を指定します。
 * - `name`: 検索フィールドの名前を指定します。
 * - `description`: 検索フィールドの説明を指定します。
 * - `isRequired`: 検索フィールドが必須かどうかを指定します。
 * - `isDisabled`: 検索フィールドを無効化するかどうかを指定します。
 * - `children`: 検索フィールドの子要素を指定します。
 *
 * ### 使用例
 * ```tsx
 * <SearchField label="検索" name="search" isRequired>
 *   <SearchInput placeholder="キーワードを入力" />
 * </SearchField>
 * ```
 */
export function SearchField(properties: SearchProperties): ReactNode {
  return (
    <AriaSearchField
      {...properties}
      isRequired={properties.isRequired}
      isDisabled={properties.isDisabled}
      name={properties.name}
      defaultValue={properties.defaultValue}
      className={`${styles.searchContainer} ${properties.className}`}
      style={properties.style}
    >
      {properties.label && <AriaLabel className={styles.searchLabel}>{properties.label}</AriaLabel>}
      {properties.children}
      {properties.description && <AriaLabel slot="description" className={styles.searchLabel}>{properties.description}</AriaLabel>}
      <AriaFieldError />
    </AriaSearchField>
  )
}

export type SearchInputProperties = {
  placeholder?: string
  className?: string
  style?: CSSProperties
} & AriaInputProperties

/**
 * ## Ganoineの検索入力コンポーネント
 * `react-aria-components`の`Input`コンポーネントを使用して、アクセシブルな検索入力フィールドを提供します。
 *
 * - `placeholder`: 検索入力フィールドのプレースホルダーを指定します。
 * - `className`: 検索入力フィールドのクラス名を指定します。
 * - `style`: 検索入力フィールドのスタイルを指定します。
 *
 * ### 使用例
 * ```tsx
 * <SearchInput placeholder="キーワードを入力" />
 * ```
 */
export function SearchInput(properties: SearchInputProperties): ReactNode {
  return (
    <AriaInput {...properties} className={`${styles.inputBox} ${properties.className}`} style={properties.style} placeholder={properties.placeholder} />
  )
}

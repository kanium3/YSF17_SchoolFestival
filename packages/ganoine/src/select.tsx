'use client'

import { ComponentPropsWithRef, CSSProperties, ReactNode, useContext } from 'react'
import {
  SelectProps as AriaSelectProperties,
  Select as AriaSelect,
  Label as AriaLabel,
  Text as AriaText,
  FieldError as AriaFieldError,
  Button as AriaButton,
  ButtonProps as AriaButtonProperties,
  SelectValue as AriaSelectValue,
  SelectStateContext as AriaSelectStateContext,
  ListBoxSection as AriaListBoxSection,
  ListBoxSectionProps as AriaListBoxSectionProperties,
  Header as AriaHeader,
  ListBox as AriaListBox,
  ListBoxProps as AriaListBoxProperties,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps as AriaListBoxItemProperties,
  Collection as AriaCollection,
  Popover as AriaPopover,
} from 'react-aria-components'
import { MdOutlineExpandLess, MdOutlineExpandMore } from 'react-icons/md'
import styles from './select.module.css'

export type SelectProperties = {
  children: ReactNode
  label?: string
  isRequired?: boolean
  formName?: string
  isDisabled?: boolean
  placeholder?: string
  className?: string
  style?: CSSProperties
} & Omit<ComponentPropsWithRef<'div'>, 'children'>
& Omit<AriaSelectProperties, 'children'>

export function Select(properties: SelectProperties): ReactNode {
  return (
    <AriaSelect
      {...properties}
      name={properties.formName}
      className={`${styles.select} ${properties.className}`}
      style={properties.style}
    >
      <AriaLabel>{properties.label}</AriaLabel>
      <AriaFieldError />
      {properties.children}
    </AriaSelect>
  )
}

export type SelectButtonProperties = {
  className?: string
  style?: CSSProperties
} & Omit<AriaButtonProperties, 'children'>

export function SelectButton(properties: SelectButtonProperties): ReactNode {
  const selectedState = useContext(AriaSelectStateContext)
  return (
    <AriaButton
      {...properties}
      className={`${styles.selectButton} ${properties.className}`}
      style={properties.style}
    >
      <AriaSelectValue />
      <span aria-hidden="true">
        {selectedState?.isOpen ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
      </span>
    </AriaButton>
  )
}

export type SelectPopoverProperties = {
  children: ReactNode
  className?: string
  style?: CSSProperties
}

export function SelectPopover(properties: SelectPopoverProperties): ReactNode {
  return (
    <AriaPopover>
      {properties.children}
    </AriaPopover>
  )
}

export type SelectItemsMode = 'single' | 'multiple'

export type SelectItemsProperties<T extends object> = {
  children: ReactNode
  mode?: SelectItemsMode
  ariaLabel?: string
  className?: string
  style?: CSSProperties
} & Omit<AriaListBoxProperties<T>, 'children'>

export function SelectItems<T extends object>(properties: SelectItemsProperties<T>): ReactNode {
  return (
    <AriaListBox
      {...properties}
      selectionMode={properties.mode}
      aria-label={properties.ariaLabel}
      className={`${styles.selectListBox} ${properties.className}`}
      style={properties.style}
    >
      {properties.children}
    </AriaListBox>
  )
}

export type SelectItemsGroupProperties<T extends object> = {
  children: ReactNode
  header: string
  className?: string
  style?: CSSProperties
} & Omit<AriaListBoxSectionProperties<T>, 'children'>

export function SelectItemsGroup<T extends object>(properties: SelectItemsGroupProperties<T>): ReactNode {
  return (
    <AriaListBoxSection
      {...properties}
      className={`${styles.selectListBoxSection} ${properties.className}`}
      style={properties.style}
    >
      <AriaHeader className={styles.selectGroupHeader}>{properties.header}</AriaHeader>
      <AriaCollection>
        {properties.children}
      </AriaCollection>
    </AriaListBoxSection>
  )
}

export type SelectItemProperties = {
  value: string
  label?: string
  description?: string
  className?: string
  style?: CSSProperties
} & Omit<AriaListBoxItemProperties, 'children'>

export function SelectItem(properties: SelectItemProperties): ReactNode {
  return (
    <AriaListBoxItem
      textValue={properties.value}
      id={properties.value}
      className={`${styles.selectListBoxItem} ${properties.className}`}
      style={properties.style}
    >
      <AriaText slot="label">
        {properties.label ?? properties.value}
      </AriaText>
      <AriaText slot="description">{properties.description}</AriaText>
    </AriaListBoxItem>
  )
}

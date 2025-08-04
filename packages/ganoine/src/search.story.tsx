import { SearchField, SearchInput } from './search'
import './extra/base.css'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

export default {
  title: 'Ganoine/Search',
} as Meta<typeof SearchField>

export const Default = {
  render: () => (
    <SearchField
      label="検索"
      description="検索フィールドの説明"
    >
      <SearchInput />
    </SearchField>
  ),
} as StoryObj<typeof SearchField>

export const PlaceHolder = {
  render: () => (
    <SearchField
      label="検索"
      description="検索フィールドの説明"
    >
      <SearchInput placeholder="好きなワードを入力" />
    </SearchField>
  ),
} as StoryObj<typeof SearchField>

export const Disabled = {
  render: () => (
    <SearchField
      label="検索"
      description="検索フィールドの説明"
      isDisabled={true}
    >
      <SearchInput />
    </SearchField>
  ),
} as StoryObj<typeof SearchField>

export const WithState = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [searchValue, setSearchValue] = useState('')
    return (
      <>
        <SearchField
          label="検索"
          description="検索フィールドの説明"
          onChange={setSearchValue}
        >
          <SearchInput placeholder="好きなワードを入力" />
        </SearchField>
        <p>
          入力値:
          {searchValue}
        </p>
      </>
    )
  },
} as StoryObj<typeof SearchField>

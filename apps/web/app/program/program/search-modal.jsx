'use client'

import { useSetAtom } from 'jotai'
import {
  Select,
  SelectPopover,
  SelectItems,
  SelectItem,
  PopupProvider,
  Popup,
  usePopup,
  Button,
  PopupCloseButton, SelectButton,
} from '@latimeria/ganoine'
import styles from './search-modal.module.css'
import { kindAtom, placeAtom } from '@/app/program/program/atoms'

export function SearchModal() {
  return (
    <PopupProvider>
      <PopupToggleButton />
      <Popup>
        <div>
          <h2 className={styles.queryProperty}>種類</h2>
          <KindSelectMenu />
          <h2 className={styles.queryProperty}>場所</h2>
          <PlaceSelectMenu />
          <PopupCloseButton />
        </div>
      </Popup>
    </PopupProvider>
  )
}

function PopupToggleButton() {
  const { toggleModal } = usePopup()
  return (
    <Button kind="primary" onPress={toggleModal}>
      検索条件
    </Button>
  )
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function KindSelectMenu() {
  const setKind = useSetAtom(kindAtom)
  return (
    <Select
      onSelection={(selected) => {
        setKind(previous => ({
          ...previous,
          searchParams: previous.searchParams?.append('kind', selected) ?? new URLSearchParams([['kind', selected]]),
        }))
      }}
      placeholder="種類"
      className={styles.queryProperty}
    >
      <SelectButton />
      <SelectPopover>
        <SelectItems mode="single">
          <SelectItem value="体験" label="体験" />
          <SelectItem value="展示" label="展示" />
          <SelectItem value="上演" label="上演" />
          <SelectItem value="販売" label="販売" />
          <SelectItem value="配布" label="配布" />
          <SelectItem value="募金" label="募金" />
        </SelectItems>
      </SelectPopover>
    </Select>
  )
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function PlaceSelectMenu() {
  const setPlace = useSetAtom(placeAtom)
  return (
    <Select
      onSelection={(selected) => {
        setPlace(previous => ({
          ...previous,
          searchParams: previous.searchParams?.append('place', selected) ?? new URLSearchParams([['place', selected]]),
        }))
      }}
      placeholder="場所"
      className={styles.queryProperty}
    >
      <SelectButton />
      <SelectPopover>
        <SelectItems mode="single">
          <SelectItem value="1F" />
          <SelectItem value="2F" />
          <SelectItem value="3F" />
          <SelectItem value="4F" />
          <SelectItem value="5F" />
          <SelectItem value="屋上" />
          <SelectItem value="体育館" />
          <SelectItem value="交流センター" />
        </SelectItems>
      </SelectPopover>
    </Select>
  )
}

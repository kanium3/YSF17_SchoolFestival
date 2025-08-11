'use client'

import { useAtom } from 'jotai'
import { useState } from 'react'
import {
  SelectItems,
  SelectItem,
  PopupProvider,
  Popup,
  usePopup,
  Button,
  PopupCloseButton,
} from '@latimeria/ganoine'
import styles from './search-modal.module.css'
import { searchQueryAtom } from '@/app/program/program/atoms'

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
  const { togglePopup } = usePopup()
  return (
    <Button kind="primary" onPress={togglePopup}>
      検索条件
    </Button>
  )
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function KindSelectMenu() {
  const [kind, setKind] = useAtom(searchQueryAtom)
  const [kindS, setKindS] = useState(new Set(['すべて']))

  let selectedKinds = [...kindS]//  == undefined ? [] : [...kindS].split(' ')
  if (selectedKinds.length > 1 && selectedKinds.at(-1) == 'すべて') { // 複数選択されていて、かつ、「すべて」が選択されたとき、それ以外の選択を外す
    setKind((previous) => {
      const parameters = new URLSearchParams([...previous.searchParams])
      parameters.delete('kind')
      return {
        ...previous,
        searchParams: parameters,
      }
    })
    setKindS(new Set(['すべて']))
  }
  else if (selectedKinds.length === 0)// 何も選択されていなかったら「すべて」を選択する
    setKindS(new Set(['すべて']))
  if (selectedKinds.length > 1 && selectedKinds[0] == 'すべて') { // 「すべて」以外が選択されたら「すべて」から選択を外す
    setKind((previous) => {
      const parameters = new URLSearchParams([...previous.searchParams])
      const p = parameters.get('kind').split(' ')
      parameters.delete('kind')
      parameters.set('kind', p.filter(item => item != 'すべて'))
      return {
        ...previous,
        searchParams: parameters,
      }
    })
    setKindS(new Set(selectedKinds.filter(item => item != 'すべて')))
  }

  return (
    <SelectItems
      mode="multiple"
      onSelectionChange={(selected) => {
        setKind((previous) => {
          const parameters = new URLSearchParams([...previous.searchParams])
          parameters.set('kind', [...selected].join(' '))
          return {
            ...previous,
            searchParams: parameters,
          }
        })
        setKindS(selected)
      }}
      selectedKeys={kind.searchParams?.get('kind') == undefined ? ['すべて'] : kind.searchParams?.get('kind').split(' ')}
      placeholder="すべて"
      className={styles.queryProperty}
    >
      <SelectItem value="すべて" label="すべて" />
      <SelectItem value="体験" label="体験" />
      <SelectItem value="展示" label="展示" />
      <SelectItem value="上演" label="上演" />
      <SelectItem value="販売" label="販売" />
      <SelectItem value="配布" label="配布" />
      <SelectItem value="募金" label="募金" />
    </SelectItems>
  )
}

/**
 * @returns {JSX.Element}
 * @constructor
 */
function PlaceSelectMenu() {
  const [place, setPlace] = useAtom(searchQueryAtom)
  const [placeS, setPlaceS] = useState(new Set(['すべて']))

  let selectedKinds = [...placeS]//  == undefined ? [] : [...kindS].split(' ')
  if (selectedKinds.length > 1 && selectedKinds.at(-1) == 'すべて') { // 複数選択されていて、かつ、「すべて」が選択されたとき、それ以外の選択を外す
    setPlace((previous) => {
      const parameters = new URLSearchParams([...previous.searchParams])
      parameters.delete('place')
      return {
        ...previous,
        searchParams: parameters,
      }
    })
    setPlaceS(new Set(['すべて']))
  }
  else if (selectedKinds.length === 0)// 何も選択されていなかったら「すべて」を選択する
    setPlaceS(new Set(['すべて']))
  if (selectedKinds.length > 1 && selectedKinds[0] == 'すべて') { // 「すべて」以外が選択されたら「すべて」から選択を外す
    setPlace((previous) => {
      const parameters = new URLSearchParams([...previous.searchParams])
      const p = parameters.get('place').split(' ')
      parameters.delete('place')
      parameters.set('place', p.filter(item => item != 'すべて'))
      return {
        ...previous,
        searchParams: parameters,
      }
    })
    setPlaceS(new Set(selectedKinds.filter(item => item != 'すべて')))
  }

  return (

    <SelectItems
      mode="multiple"
      onSelectionChange={(selected) => {
        setPlace((previous) => {
          const parameters = new URLSearchParams([...previous.searchParams])
          parameters.set('place', [...selected].join(' '))
          return {
            ...previous,
            searchParams: parameters,
          }
        })
        setPlaceS(selected)
      }}
      selectedKeys={place.searchParams?.get('place') == undefined ? ['すべて'] : place.searchParams?.get('place').split(' ')}
      placeholder="すべて"
      className={styles.queryProperty}
    >
      <SelectItem value="すべて" />
      <SelectItem value="1F" />
      <SelectItem value="2F" />
      <SelectItem value="3F" />
      <SelectItem value="4F" />
      <SelectItem value="5F" />
      <SelectItem value="屋上" />
      <SelectItem value="体育館" />
      <SelectItem value="交流センター" />
    </SelectItems>
  )
}

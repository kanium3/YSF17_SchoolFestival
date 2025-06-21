'use client'

import ProgramInput from '@/app/compoent/program/program-input.jsx'
import ProgramView from '@/app/compoent/program/program-view.jsx'
import ProgramSample from '@/app/program.mock.json'
import styles from '@/app/program/programs.module.css'
import { parseProgramsData, Tags } from '@latimeria/core'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { atomWithReset, useResetAtom } from 'jotai/utils'
import {
  Button,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
} from 'react-aria-components'
import { MdOutlineCancel } from 'react-icons/md'

// TODO:サンプルデータにつきデータ取り扱いの正式な方式を考慮必要
const programsAtom = atom(parseProgramsData(ProgramSample))
const tagsAtom = atomWithReset(new Tags([]))
const kindAtom = atomWithReset('')
const placeAtom = atomWithReset('')
const matchedProgramsAtom = atom((get) => {
  const programs = get(programsAtom)
  const tags = get(tagsAtom)
  const kind = get(kindAtom)
  const place = get(placeAtom)
  const kindAndTags = kind ? new Tags([...tags, kind]) : tags
  const placeAndKindAndTags = place ? new Tags([...kindAndTags, place]) : kindAndTags
  return kindAndTags.size > 0 ? programs.matchPrograms(placeAndKindAndTags) : programs
})

/**
 * @returns {JSX.Element}
 * @constructor
 */
export function ProgramsView() {
  const [tags, setTags] = useAtom(tagsAtom)
  const matchedPrograms = useAtomValue(matchedProgramsAtom)

  return (
    <div>
      <h2>企画一覧/検索</h2>
      <ProgramInput onchange={setTags} tags={tags} />
      <div className={styles.programSearchLine}>
        <KindSelectMenu />
        <PlaceSelectMenu />
        <SearchQueryClearButton />
      </div>
      <ProgramView programs={matchedPrograms} />
    </div>
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
      onSelectionChange={selected => setKind(selected)}
      placeholder="種類"
    >
      <Button className={styles.programSelectPullDown}>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox className={styles.programSelectPullDownItems}>
          <ListBoxItem id="体験">体験</ListBoxItem>
          <ListBoxItem id="展示">展示</ListBoxItem>
          <ListBoxItem id="上演">上演</ListBoxItem>
          <ListBoxItem id="販売">販売</ListBoxItem>
          <ListBoxItem id="配布">配布</ListBoxItem>
          <ListBoxItem id="募金">募金</ListBoxItem>
        </ListBox>
      </Popover>
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
      onSelectionChange={selected => setPlace(selected)}
      placeholder="場所"
    >
      <Button className={styles.programSelectPullDown}>
        <SelectValue />
        <span aria-hidden="true">▼</span>
      </Button>
      <Popover>
        <ListBox className={styles.programSelectPullDownItems}>
          <ListBoxItem id="1F">1F</ListBoxItem>
          <ListBoxItem id="2F">2F</ListBoxItem>
          <ListBoxItem id="3F">3F</ListBoxItem>
          <ListBoxItem id="4F">4F</ListBoxItem>
          <ListBoxItem id="5F">5F</ListBoxItem>
          <ListBoxItem id="屋上">屋上</ListBoxItem>
          <ListBoxItem id="体育館">体育館</ListBoxItem>
          <ListBoxItem id="交流センター">交流センター</ListBoxItem>
        </ListBox>
      </Popover>
    </Select>
  )
}

function SearchQueryClearButton() {
  const resetTags = useResetAtom(tagsAtom)
  const resetKind = useResetAtom(kindAtom)
  const resetPlace = useResetAtom(placeAtom)
  return (
    <Button
      onPress={() => {
        resetTags()
        resetKind()
        resetPlace()
      }}
      className={styles.programSelectResetButton}
    >
      <MdOutlineCancel />
      条件をクリアする
    </Button>
  )
}

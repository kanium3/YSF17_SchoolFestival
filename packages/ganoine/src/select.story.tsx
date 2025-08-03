import './extra/base.css'
import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectButton, SelectItem, SelectItemsGroup, SelectItems, SelectPopover } from './select'
import { useState } from 'react'

export default {
  title: 'Ganoine/Select',
  component: Select,
} as Meta<typeof Select>

export const Default = {
  args: {
    children: (
      <>
        <SelectButton />
        <SelectPopover>
          <SelectItems>
            <SelectItem value="value1" label="Value1" />
            <SelectItem value="value2" label="値2" />
          </SelectItems>
        </SelectPopover>
      </>
    ),
  },
} as StoryObj<typeof Select>

export const Group = {
  args: {
    children: (
      <>
        <SelectButton />
        <SelectPopover>
          <SelectItems>
            <SelectItemsGroup header="Group 1">
              <SelectItem value="value1" label="Value1" />
              <SelectItem value="value2" label="Value2" />
            </SelectItemsGroup>
            <SelectItemsGroup header="Group 2">
              <SelectItem value="value3" label="Value3" />
              <SelectItem value="value4" label="Value4" />
            </SelectItemsGroup>
          </SelectItems>
        </SelectPopover>
      </>
    ),
  },
} as StoryObj<typeof Select>

export const LongItems = {
  args: {
    children: (
      <>
        <SelectButton />
        <SelectPopover>
          <SelectItems>
            <SelectItem
              value="ihatov1"
              label="あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。"
            />
            <SelectItem
              value="ihatov2"
              label="またそのなかでいっしょになったたくさんのひとたち、ファゼーロとロザーロ、羊飼のミーロや、顔の赤いこどもたち、地主のテーモ、山猫博士のボーガント・デストゥパーゴなど、いまこの暗い巨きな石の建物のなかで考えていると、みんなむかし風のなつかしい青い幻燈のように思われます。では、わたくしはいつかの小さなみだしをつけながら、しずかにあの年のイーハトーヴォの五月から十月までを書きつけましょう。"
            />
          </SelectItems>
        </SelectPopover>
      </>
    ),
  },
} as StoryObj<typeof Select>

export const Disable = {
  args: {
    isDisabled: true,
    children: (
      <>
        <SelectButton />
        <SelectPopover>
          <SelectItems>
            <SelectItem value="value1" label="Value1" />
            <SelectItem value="value2" label="値2" />
          </SelectItems>
        </SelectPopover>
      </>
    ),
  },
} as StoryObj<typeof Select>

export const WithState = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState('value1')
    return (
      <>
        <p>{selected}</p>
        <Select
          selectedKey={selected}
          onSelectionChange={key => setSelected(key as string)}
        >
          <SelectButton />
          <SelectPopover>
            <SelectItems>
              <SelectItem value="value1" label="Value1" />
              <SelectItem value="value2" label="値2" />
            </SelectItems>
          </SelectPopover>
        </Select>
      </>
    )
  },
} as StoryObj<typeof Select>

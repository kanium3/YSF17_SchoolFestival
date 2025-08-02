import './extra/base.css'
import type { Meta, StoryObj } from '@storybook/react'
import { Select, SelectButton, SelectItem, SelectItemsGroup, SelectItems, SelectPopover } from './select'

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
          </SelectItems>
        </SelectPopover>
      </>
    ),
  },
} as StoryObj<typeof Select>

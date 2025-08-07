import { Popup, PopupCloseButton } from './popup'
import { Button } from './button'
import './extra/base.css'
import { Meta, StoryObj } from '@storybook/react'
import { PopupProvider, usePopup } from './popup-context'

export default {
  title: 'Ganoine/Popup',
  component: Popup,
} as Meta<typeof Popup>

export const Default = {
  args: {
    children: (
      <>
        <div>
          <h1>ミニページのタイトル</h1>
          <p>全ての設定がデフォルトのポップアップ(モーダル)の例です。</p>
        </div>
        <PopupCloseButton />
      </>
    ),
  },
  render: args => (
    <PopupProvider>
      <ModalButton />
      <Popup {...args} />
    </PopupProvider>
  ),
} as StoryObj<typeof Popup>

export const PopupLocked = {
  args: {
    isDismissable: false,
    children: (
      <>
        <div>
          <h1>クリックに反応しないポップアップ</h1>
          <p>背景をクリックしても閉じないタイプのポップアップです。</p>
        </div>
        <PopupCloseButton />
      </>
    ),
  },
  render: args => (
    <PopupProvider>
      <ModalButton />
      <Popup {...args} />
    </PopupProvider>
  ),
} as StoryObj<typeof Popup>

export const PopupSizefixed = {
  args: {
    popupHeight: 500,
    popupWidth: 500,
    children: (
      <>
        <div>
          <h1>サイズ固定のポップアップ</h1>
          <p>サイズを500✕500（単位：px）に固定したタイプのポップアップです。</p>
        </div>
        <PopupCloseButton />
      </>
    ),
  },
  render: args => (
    <PopupProvider>
      <ModalButton />
      <Popup {...args} />
    </PopupProvider>
  ),
} as StoryObj<typeof Popup>

const ModalButton = () => {
  const { togglePopup } = usePopup()
  return <Button onPress={() => togglePopup()}>ポップアップを開くボタン</Button>
}

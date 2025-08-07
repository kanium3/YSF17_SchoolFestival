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
  render: () => (
    <PopupProvider>
      <PopupButton />
      <Popup>
        <div>
          <h1>ミニページのタイトル</h1>
          <p>全ての設定がデフォルトのポップアップ(モーダル)の例です。</p>
        </div>
        <PopupCloseButton />
      </Popup>
    </PopupProvider>
  ),
} as StoryObj<typeof Popup>

export const PopupLocked = {
  render: () => (
    <PopupProvider>
      <PopupButton />
      <Popup isDismissable={false}>
        <div>
          <h1>クリックに反応しないポップアップ</h1>
          <p>背景をクリックしても閉じないタイプのポップアップです。</p>
        </div>
        <PopupCloseButton />
      </Popup>
    </PopupProvider>
  ),

} as StoryObj<typeof Popup>

export const PopupSizefixed = {
  render: () => (
    <PopupProvider>
      <PopupButton />
      <Popup popupHeight={500} popupWidth={500}>
        <div>
          <h1>サイズ固定のポップアップ</h1>
          <p>サイズを500✕500（単位：px）に固定したタイプのポップアップです。</p>
        </div>
        <PopupCloseButton />
      </Popup>
    </PopupProvider>
  ),
} as StoryObj<typeof Popup>

const PopupButton = () => {
  const { togglePopup } = usePopup()
  return <Button onPress={() => togglePopup()}>ポップアップを開くボタン</Button>
}

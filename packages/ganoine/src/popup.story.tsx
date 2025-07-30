import { Popup, PopupCloseButton } from './popup'
import { Button } from './button'
import './extra/base.css'
import { Meta, StoryObj } from '@storybook/react'
import { PopupProvider, usePopup } from './popup-context'

export default {
  title: 'Ganoine/Popup',
  component: Popup,
} as Meta<typeof Popup>

export const ProgramPopup = {
  render: () => (
    <PopupProvider>
      <ModalButton />
      <Popup>
        <div>
          <h1>ミニページのタイトル</h1>
          <p>ポップアップ(モーダル)の例です。</p>
        </div>
        <PopupCloseButton />
      </Popup>
    </PopupProvider>
  ),
} as StoryObj<typeof Popup>

const ModalButton = () => {
  const { toggleModal } = usePopup()
  return <Button onPress={() => toggleModal()}>ポップアップを開くボタン</Button>
}

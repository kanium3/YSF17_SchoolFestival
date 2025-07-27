import { ProgramPopup } from './programPopup'
import { Button } from './button'
import { ModalProvider, useModalContext } from './ModalContext'
import './extra/base.css'
import { Meta, StoryObj } from '@storybook/react'

export default {
  title: 'Ganoine/ProgramPopup',
  component: ProgramPopup,
} as Meta<typeof ProgramPopup>

export const ProgramPopup = {
  args: {
    hasOpenButton: true,
    contentChildren: (
      <div>
        <h1>ミニページのタイトル</h1>
        <p>開くボタンがついたミニページのポップアップ(モーダル)の例です。</p>
      </div>
    ),
  },
} as StoryObj<typeof ProgramPopup>

const ModalButton = () => {
  const { handleClick } = usePopup()
  return <Button onPress={handleClick}>ポップアップを開くボタン</button>
}

WithoutButton.decorators = [
  (Story) => (
    <ModalProvider>
      <ModalButton />
      <Story />
    </ModalProvider>
  ),
]

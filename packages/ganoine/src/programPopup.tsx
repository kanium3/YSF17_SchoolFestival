'use client'

import styles from './programPopup.module.css'
import type { ReactNode } from 'react'
import { useModalContext } from './popupContext'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'
import { Button } from './button'

export type PopupKinds = 'default'

export type PopupProperties = {
  children: ReactNode
  popwidth?: number
  popheight?: number
}

/**
 * ## Ganoineのポップアップコンポーネント
 * `ProgramPopup`を使うことでreact-aria-componentsのModalを使用したポップアップを作成することができます。
 *
 * このコンポーネントは必ず`<ModalProvider>`を親要素ことに取ることが必要となります。`<ModalProvider>`は`context`を用いたModalの開閉を認識するための関数です。
 * `<ModalProvider>`は`@latimeria/ganoine`よりインポートできます。
 *
 * `hasOpenButton`に`true`を指定することで、開くためのボタンをつけることができます。
 * `false`を指定した場合は`handleClik`に`usePopup`の値を設定することが必要になります。設定した後は、クリックイベントを入れたいタグに`onClick`などで設定します。
 * この`false`の場合にも対応させるため、`hasOpenButton`の状態にかかわらず必ず`<ModalProvider>`を必要とします。
 *
 * `popheight`や`popwidth`に数値を代入することで、ポップアップの大きさを指定できます。デフォルトではPCでは画面サイズのおよそ0.6倍ほど、スマホでは画面サイズの0.85倍ほどになるように設定されています。
 
 **/

export function ProgramPopup(properties: PopupProperties): ReactNode {
  const popheight = properties.popheight ?? window.innerHeight - 144
  const popwidth = properties.popwidth ?? widthAdjust(window.innerWidth - 24)
  const screenSize = {
    '--popwidth': `${popwidth}px`,
    '--popheight': `${popheight}px`,
  }
  const { isOpen, toggleModal} = useModalContext();
  return (
    <>
      <ModalOverlay isDismissable isOpen={isOpen} onOpenChange={toggleModal} className={styles.backdrop}>
        <Modal>
          <Dialog>
            <div className={styles.main} style={screenSize as React.CSSProperties}>
              <Button onPress={toggleModal}>
                <p>✕</p>
              </Button>
              {properties.children}
              <Button onPress = {toggleModal}>
                <p>閉じる</p>
              </Button>
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}

function widthAdjust(width: number) {
  return Math.min(width * 0.85, width * 0.5 + 200)
}

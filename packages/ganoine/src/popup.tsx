'use client'

import styles from './popup.module.css'
import type { CSSProperties, ReactNode } from 'react'
import { usePopup } from './popup-context'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'
import { Button } from './button'

export type PopupProperties = {
  children: ReactNode
  popupWidth?: number
  popupHeight?: number
}

/**
 * ## Ganoineのポップアップコンポーネント
 * `Popup`を使うことでreact-aria-componentsのModalを使用したポップアップを作成することができます。
 *
 * このコンポーネントは必ず`<ModalProvider>`を親要素ことに取ることが必要となります。`<ModalProvider>`は`context`を用いたModalの開閉を認識するための関数です。
 * `<ModalProvider>`は`@latimeria/ganoine`よりインポートできます。
 *
 * この`false`の場合にも対応させるため、`hasOpenButton`の状態にかかわらず必ず`<ModalProvider>`を必要とします。
 *
 * `popupHeight`や`popupWidth`に数値を代入することで、ポップアップの大きさを指定できます。デフォルトではPCでは画面サイズのおよそ0.6倍ほど、スマホでは画面サイズの0.85倍ほどになるように設定されています。

 **/

export function Popup(properties: PopupProperties): ReactNode {
  const popheight = properties.popupHeight ?? window.innerHeight - 144
  const popwidth = properties.popupWidth ?? widthAdjust(window.innerWidth - 24)
  const screenSize = {
    '--popwidth': `${popwidth}px`,
    '--popheight': `${popheight}px`,
  }
  const { isOpen, toggleModal } = usePopup()
  return (
    <>
      <ModalOverlay isDismissable={false} isOpen={isOpen} onOpenChange={toggleModal} className={styles.backdrop}>
        <Modal>
          <Dialog>
            <div className={styles.main} style={screenSize as CSSProperties}>
              {properties.children}
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </>
  )
}

export type PopupCloseButtonProperties = {
  children?: ReactNode
}

/**
 * ## ポップアップの閉じるボタン
 * `PopupCloseButton`はポップアップを閉じるためのボタンです。
 * このコンポーネントは`<Popup>`の子要素として使用することができます。
 *
 * `children`に文字列を代入することで、ボタンのテキストを変更することができます。
 * デフォルトでは「閉じる」というテキストが表示されます。
 */
export function PopupCloseButton(properties: PopupCloseButtonProperties): ReactNode {
  const { toggleModal } = usePopup()
  return (
    <Button onPress={toggleModal}>
      <p>{properties.children ?? '閉じる'}</p>
    </Button>
  )
}

function widthAdjust(width: number) {
  return Math.min(width * 0.85, width * 0.5 + 200)
}

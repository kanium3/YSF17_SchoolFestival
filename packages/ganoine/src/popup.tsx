'use client'

import styles from './popup.module.css'
import type { CSSProperties, ReactNode } from 'react'
import { usePopup } from './popup-context'
import { Dialog, Modal, ModalOverlay } from 'react-aria-components'
import { Button } from './button'
import { useEffect, useState } from 'react'

export type PopupProperties = {
  children: ReactNode
  popupWidth?: number
  popupHeight?: number
  isDismissable?: boolean
}

/**
 * ## Ganoineのポップアップコンポーネント
 * `Popup`を使うことでreact-aria-componentsのModalを使用したポップアップを作成することができます。
 *
 * このコンポーネントは必ず`<PopupProvider>`を親要素ことに取ることが必要となります。`<PopupProvider>`は`context`を用いたPopupの開閉を認識するための関数です。
 * `<PopupProvider>`は`@latimeria/ganoine`よりインポートできます。
 *
 * 開くためのボタンをプログラムのどの部分で書いてもいいようにするために、必ず`<PopupProvider>`を必要とします。
 *
 * `popupHeight`や`popupWidth`に数値を代入することで、ポップアップの大きさを指定できます。デフォルトではPCでは画面サイズのおよそ0.6倍ほど、スマホでは画面サイズの0.85倍ほどになるように設定されています。
 *
 * `isDismissable`は背景をクリックorタップしたときにポップアップを閉じるかどうかを指定するためのものです。`boolean`型が代入でき、デフォルトでは`true`となっています。

 **/

export function Popup(properties: PopupProperties): ReactNode {
  /*
  const popheight = properties.popupHeight ?? window.innerHeight - 144
  const popwidth = properties.popupWidth ?? widthAdjust(window.innerWidth - 24)
  */

  const useWindowSize = () => {
    type WindowSize = {
      popwidth?: number
      popheight?: number
    }

    const [popSize, setPopSize] = useState<WindowSize>({
      popheight: properties.popupHeight ?? window.innerHeight - 144,
      popwidth: properties.popupWidth ?? widthAdjust(window.innerWidth - 24),
    })

    useEffect(() => {
      const resize = () => {
        setPopSize({
          popheight: properties.popupHeight ?? window.innerHeight - 144,
          popwidth: properties.popupWidth ?? widthAdjust(window.innerWidth - 24),
        })
      }

      window.addEventListener('resize', resize)
      return () => window.removeEventListener('resize', resize)
    }, [])

    return popSize
  }

  const { popheight, popwidth } = useWindowSize()

  const screenSize = {
    '--popwidth': `${popwidth}px`,
    '--popheight': `${popheight}px`,
  }
  const { isOpen, togglePopup } = usePopup()
  return (
    <>
      <ModalOverlay isDismissable={properties.isDismissable ?? true} isOpen={isOpen} onOpenChange={togglePopup} className={styles.backdrop}>
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
  const { togglePopup } = usePopup()
  return (
    <Button onPress={togglePopup}>
      <p>{properties.children ?? '閉じる'}</p>
    </Button>
  )
}

function widthAdjust(width: number) {
  return Math.min(width * 0.85, width * 0.5 + 200)
}

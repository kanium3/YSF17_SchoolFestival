'use client'

import styles from './popup.module.css'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { DialogTrigger, Dialog, Modal, ModalOverlay } from 'react-aria-components'
import { Button } from './button'

export type PopupKinds = 'default'

export type PopupProperties = {
  children: ReactNode
  hasOpenButton?: boolean
  kind?: PopupKinds
  popwidth?: number
  popheight?: number
}

/**
 * ## Ganoineのポップアップコンポーネント
 * `ProgramPopup`を使うことでポップアップを作成することができます。
 *
 * 例えばミニページやエラーなどを表示させるポップアップを作れます。
 *
 * `hasOpenButton`プロパティに`true`を指定することで、開くためのボタンをつけることができます。
 *
 * `PopupKind`プロパティに種類を指定することで子要素の中身を指定することもできます。子要素を自由に取りたい場合は`default`を使用します。
 * (現在`PopupKind`に指定できるのは`default`のみです。)
 *
 **/

export function ProgramPopup(properties: PopupProperties): ReactNode {
  const popheight = properties.popheight ?? window.innerHeight - 144
  const popwidth = properties.popwidth ?? widthAdjust(window.innerWidth - 24)
  const screenSize = {
    '--popwidth': `${popwidth}px`,
    '--popheight': `${popheight}px`,
  }
  // const [isDisplayPage, setDisplayPage] = useState(false)
  return (
    <DialogTrigger>
      { properties.hasOpenButton
        && (
          <Button>
            <p>ポップアップを開く</p>
          </Button>
        )}
      <ModalOverlay isDismissable className={styles.backdrop}>
        <Modal>
          <Dialog>
            <div className={styles.main} style={screenSize as React.CSSProperties}>
              {properties.children}
            </div>
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  )
}

function widthAdjust(width: number) {
  return Math.min(width * 0.85, width * 0.5 + 200)
}

const handleContentClick = (event) => {
  event.stopPropagation()
}

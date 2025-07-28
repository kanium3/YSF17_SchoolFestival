import type { ReactNode } from 'react'
import { Typeset } from '@storybook/addon-docs/blocks'
import token from '@latimeria/design-token'

const sampleText = 'うれしい楽しい大好き！'
const fontPrimary = '"LINE Seed JP", sans-serif'
const fontSecond = '"Noto Sans JP", sans-serif'

const availableTypeSet = (): ReactNode => {
  return (
    <div>
      <h1>Font</h1>
      <p>フォントの大きさなどを指定します。現時点ではフォントのサイズが使用可能です</p>
      <p>
        CSSでは
        <code>--semantic-font-size-[variableKind]</code>
        で指定出来ます。
      </p>
      <p>
        単位は
        <code>rem</code>
        です
      </p>
      <p>
        以下サンプルは
        <code>1rem=16px</code>
        として表示します
      </p>
      <h2>LINE Seed JP</h2>
      <Typeset
        fontSizes={Object.values(token.semantic.font.size).map(size => size * 16)}
        sampleText={sampleText}
        fontFamily={fontPrimary}
      />
      <h2>Noto Sans JP</h2>
      <Typeset
        fontSizes={Object.values(token.semantic.font.size).map(size => size * 16)}
        sampleText={sampleText}
        fontFamily={fontSecond}
      />
    </div>
  )
}

export default availableTypeSet

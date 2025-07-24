import type { ReactNode } from 'react'
import { Typeset } from '@storybook/addon-docs/blocks'
import token from '@latimeria/design-token'

const sampleText = 'うれしい楽しい大好き！'
const fontPrimary = '"LINE Seed JP", sans-serif'
const fontSecond = '"Noto Sans JP", sans-serif'

const availableTypeSet = (): ReactNode => {
  return (
    <div>
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

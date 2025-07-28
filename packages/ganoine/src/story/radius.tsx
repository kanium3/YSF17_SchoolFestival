import type { ReactNode } from 'react'
import token from '@latimeria/design-token'

const BasicBlockWithRadius = (): ReactNode => {
  return (
    <div>
      <h1>Radius</h1>
      <p>
        CSSでは
        <code>--semantic-radius-[kind]</code>
        で指定出来ます。
      </p>
      <p>
        単位は
        <code>px</code>
        です
      </p>
      {Object.entries(token.semantic.radius).map(([key, radius]) => {
        return (
          <div key={key} style={{ paddingTop: token.semantic.space.small }}>
            <h3>{key}</h3>
            <div
              style={{
                height: 150,
                width: 150,
                background: token.semantic.surface['1'],
                borderRadius: radius,
              }}
            >
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default BasicBlockWithRadius

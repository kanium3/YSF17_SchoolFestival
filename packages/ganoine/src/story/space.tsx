import type { ReactNode } from 'react'
import token from '@latimeria/design-token'

const SpaceList = (): ReactNode => {
  return (
    <div>
      <h1>Spacing</h1>
      <p>
        CSSでは
        <code>--semantic-space-[variableKind]</code>
        で指定出来ます。
      </p>
      <p>
        単位は
        <code>px</code>
        です
      </p>
      <h2>Width</h2>
      {Object.entries(token.semantic.space).map(([key, space]) => {
        return (
          <div key={key} style={{ paddingTop: token.semantic.space.small }}>
            <h3>
              {key}
              (
              {space}
              px)
            </h3>
            <div
              style={{
                height: 100,
                width: space,
                background: token.semantic.surface['1'],
              }}
            >
            </div>
          </div>
        )
      })}

      <h2>Height</h2>
      {Object.entries(token.semantic.space).map(([key, space]) => {
        return (
          <div key={key} style={{ paddingTop: token.semantic.space.small }}>
            <h3>
              {key}
              (
              {space}
              px)
            </h3>
            <div
              style={{
                height: space,
                width: 100,
                background: token.semantic.surface['1'],
              }}
            >
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default SpaceList

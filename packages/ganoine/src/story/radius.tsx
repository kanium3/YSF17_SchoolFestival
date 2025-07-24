import type { ReactNode } from 'react'
import token from '@latimeria/design-token'

const BasicBlockWithRadius = (): ReactNode => {
  return (
    <div>
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

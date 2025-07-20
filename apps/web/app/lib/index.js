export * from './svg-controller.js'
export * from '@latimeria/core'

/**
 * URLパスを取得する。
 * `NODE_ENV`が有効時、`/YSF17_SchoolFestival`から始まるパスを返します。開発時は`src`をそのまま返します。
 * @param {string} source
 * @return {string}
 */
export function solveBasePath(source) {
  return process.env.NODE_ENV === 'production'
    ? `/YSF17_SchoolFestival${source}`
    : source
}

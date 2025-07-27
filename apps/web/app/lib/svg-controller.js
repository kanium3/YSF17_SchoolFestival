import { parse } from 'svg-parser'
import { pathDataToPolys } from 'svg-path-to-polygons'

export class SVGController {
  /**
   * @type {import("@types/hast").Root}
   */
  map

  /**
   * @param {string} source SVGソースコード
   */
  constructor(source) {
    this.map = parse(source)
  }

  /**
   * @param {import("@types/hast").ElementContent[]} children 子Node
   * @param {function(string, string): boolean} query `property`名, `property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @param {(import("@types/hast").Element)[]} collector
   */
  #rescursiveAllProps(children, query, collector) {
    for (const child of children) {
      for (const property in child.properties) {
        if (query(property, child.properties[property])) {
          collector.push(child)
        }
      }
      if (child.type === 'element' && child.children.length > 0) {
        this.#rescursiveAllProps(child.children, query, collector)
      }
    }
  }

  /**
   * @param {import("@types/hast").ElementContent[]} children 子Node
   * @param {string} tagName 対象とするタグ名
   * @param {string} propertyName 対象とするプロパティ名
   * @param {function(string): boolean} query `property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @param {(import("@types/hast").Element)[]} collector
   */
  #rescursiveTagProp(children, tagName, propertyName, query, collector) {
    for (const child of children) {
      if (child.tagName === tagName && query(child.properties[propertyName])) {
        collector.push(child)
      }
      if (child.type === 'element' && child.children.length > 0) {
        this.#rescursiveTagProp(child.children, tagName, propertyName, query, collector)
      }
    }
  }

  /**
   * @param {string} tagName
   * @returns {(import("@types/hast").Element)[]}
   */
  getElementsByTagName(tagName) {
    let result = []
    const search = (children) => {
      for (const child of children) {
        if (child.tagName === tagName) {
          result.push(child)
        }
        if (child.type === 'element' && child.children.length > 0) {
          search(child.children)
        }
      }
    }
    search(this.map.children)
    return result
  }

  /**
   * `query`に当てはまる`Element`を取得する。
   * @param {function(string, string): boolean} query `property`名,`property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @return {(import("@types/hast").Element)[]}
   */
  matchedPropertyValues(query) {
    let matchedShapes = []
    this.#rescursiveAllProps(this.map.children, query, matchedShapes)
    return matchedShapes
  }

  /**
   * @param {string} tagName 対象とするタグ名
   * @param {string} propertyName 対象とするプロパティ名
   * @param {function(string): boolean} query `property`値を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @return {(import("@types/hast").Element)[]}
   */
  matchedTagAndProperty(tagName, propertyName, query) {
    let result = []
    this.#rescursiveTagProp(this.map.children, tagName, propertyName, query, result)
    return result
  }

  /**
   * SVGの`width`と`height`を取得する。
   * @return {[number, number]} SVGの幅と高さを返します。
   */
  getSVGSize() {
    const rootElement = this.map.children[0]
    return [rootElement.properties['width'], rootElement.properties['height']]
  }
}

/**
 * SVGパスをポリゴンの配列に変換する。
 * @param {string} path pathのデータ(`d`属性の値)を指定します。
 * @return {[number, number][][]} ポリゴンの配列を返します。
 */
export function Path2PolygonArray(path) {
  return pathDataToPolys(path)
}

/**
 * SVGパスをポリゴンに変換する。
 * @param {string} path pathのデータ(`d`属性の値)を指定します。
 * @return {[number, number][]} ポリゴンを返します。
 */
export function Path2Polygon(path) {
  return Path2PolygonArray(path).flat()
}

/**
 * SVGパスと調整のための情報をPositionsに変換する。
 */
function PathAndAdjustInfo2Positions(path, zoomRatio, padding, layerPointToLatLng) {
  const polygon = Path2Polygon(path)
  const [paddingWidth, paddingHeight] = padding
  let positions = []
  for (const point of polygon) {
    const transPoint = [
      point[0] * zoomRatio + paddingWidth,
      point[1] * zoomRatio + paddingHeight,
    ]
    positions.push(layerPointToLatLng(transPoint))
  }
  return positions
}

/**
 * @param {[width: number, height: number]} picSize [width, height]
 * @param {[width: number, height: number]} svgSize [width, height]
 */
export function zoomRatioAndPaddings(picSize, svgSize) {
  let zoomRatio
  let paddingWidth = 0, paddingHeight = 0
  const [picWidth, picHeight] = picSize
  const [svgWidth, svgHeight] = svgSize
  if (picWidth / svgWidth > picHeight / svgHeight) {
    zoomRatio = picHeight / svgHeight
    paddingWidth = (picWidth - svgWidth * zoomRatio) / 2
  }
  else {
    zoomRatio = picWidth / svgWidth
    paddingHeight = (picHeight - svgHeight * zoomRatio) / 2
  }
  return [zoomRatio, [paddingWidth, paddingHeight]]
}

/**
 * SVGパスとマップの情報をPositionsに変換する。
 * @param {string} path pathのデータ(`d`属性の値)を指定します。
 * @param {[width: number, height: number]} picSize [width, height]
 * @param {[width: number, height: number]} svgSize [width, height]
 * @param {(point: [number, number]) => { lat: number, lng: number }} layerPointToLatLng useMap()にあるやつを式埋め込みで渡すのが望ましい
 */
export function PathAndMapInfo2Positions(path, picSize, svgSize, layerPointToLatLng) {
  const [zoomRatio, padding] = zoomRatioAndPaddings(picSize, svgSize)
  return PathAndAdjustInfo2Positions(path, zoomRatio, padding, layerPointToLatLng)
}

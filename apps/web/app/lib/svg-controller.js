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
   * @param {function(string): boolean} query `property`名を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   */
  #spreadChildren(children, query) {
    for (const child of children) {
      for (const property in child.properties) {
        if (query(property)) {
          return child
        }
      }
      if (child.children.length > 1) {
        this.#spreadChildren(child.children, query)
      }
    }
  }

  /**
   * `query`に対応する`property`の値を取得する。
   * @param {function(string): boolean} query `property`名を引数に取ります。真値を返した`property`を持つ`Element[]`が返り値です
   * @return {(import("@types/hast").Element)[]}
   */
  matchedPropertyValues(query) {
    let matchedShapes = []
    for (const child of this.map.children) {
      const matched = this.#spreadChildren(child.children, query)
      matchedShapes.push(matched)
    }
    return matchedShapes
  }

  /**
   * SVGパスをポリゴンに変換する。
   * @param {string} path pathのデータ(`d`属性の値)を指定します。
   * @return {[number,number][]} ポリゴンの配列を返します。
   */
  convertPathToPolygons(path) {
    return pathDataToPolys(path)
  }
}

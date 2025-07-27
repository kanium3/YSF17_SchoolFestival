import { ImageOverlay, LayerGroup, Polygon, Popup, useMap } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import { SVGController } from '@/app/lib/index.js'
import { pathDataToPolys } from 'svg-path-to-polygons'

/**
 * @param {Object} props
 * @param {string} props.src
 * @param {string} props.raw
 * @param {Number} picWidth
 * @param {Number} picHeight
 * @param {(ids: string[]) => void} props.onSelectIds 部屋選択時に呼び出すコールバック関数。選択された部屋が持つ企画idの配列を受け取る
 */
export function FloorLayer({ src, raw, picWidth, picHeight, onSelectIds }) {
  const map = useMap()
  const svgController = new SVGController(raw)
  // eslint-disable-next-line unicorn/prefer-query-selector
  const paths = svgController.getElementsByTagName('path')

  const [svgWidth, svgHeight] = svgController.getSVGSize()
  let zoomRatio
  let paddingWidth = 0, paddingHeight = 0
  if (picWidth / svgWidth > picHeight / svgHeight) {
    zoomRatio = picHeight / svgHeight
    paddingWidth = (picWidth - svgWidth * zoomRatio) / 2
  }
  else {
    zoomRatio = picWidth / svgWidth
    paddingHeight = (picHeight - svgHeight * zoomRatio) / 2
  }

  const calcPositions = (polys) => {
    const poly = polys.flat()
    let positions = []
    for (const point of poly) {
      const transPoint = [
        point[0] * zoomRatio + paddingWidth,
        point[1] * zoomRatio + paddingHeight,
      ]
      positions.push(map.layerPointToLatLng(transPoint))
    }
    return positions
  }

  return (
    <LayerGroup>
      <ImageOverlay url={src} bounds={new LatLngBounds([[0, 0], [picHeight, picWidth]])}>
        {paths.map((element) => {
          const ids_string = element.properties.id
          const ids = ids_string.split(',')
          const positions = calcPositions(pathDataToPolys(element.properties['d']))
          return (
            <LayerGroup key={ids[0]}>
              <Polygon
                eventHandlers={{
                  click: () => {
                    onSelectIds(ids)
                  },
                }}
                pathOptions={{ fillOpacity: '100%', opacity: '100%' }} // どちらも0%にする (背景のsvgに任せるため)
                positions={positions}
              >
                {!onSelectIds && ( // 関数なしの場合
                  <Popup>
                    {ids.map(id => <div key={id}>{id}</div>)}
                  </Popup>
                )}
              </Polygon>
            </LayerGroup>
          )
        })}
      </ImageOverlay>
    </LayerGroup>
  )
}

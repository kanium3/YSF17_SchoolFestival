'use client'

import Floor1URL from './data/bg/1.svg?url'
import Floor2URL from './data/bg/2.svg?url'
import Floor3URL from './data/bg/3.svg?url'
import Floor4URL from './data/bg/4.svg?url'
import Floor5URL from './data/bg/5.svg?url'
import Floor6URL from './data/bg/6.svg?url'
import Floor1Raw from './data/programs/1.svg?raw'
import Floor2Raw from './data/programs/2.svg?raw'
import Floor3Raw from './data/programs/3.svg?raw'
import Floor4Raw from './data/programs/4.svg?raw'
import Floor5Raw from './data/programs/5.svg?raw'
import Floor6Raw from './data/programs/6.svg?raw'

const mapList = [
  { floor: '屋上', url: Floor6URL, raw: Floor6Raw, cssid: 'radioRoof' },
  { floor: '5F', url: Floor5URL, raw: Floor5Raw, cssid: 'radio5F' },
  { floor: '4F', url: Floor4URL, raw: Floor4Raw, cssid: 'radio4F' },
  { floor: '3F', url: Floor3URL, raw: Floor3Raw, cssid: 'radio3F' },
  { floor: '2F', url: Floor2URL, raw: Floor2Raw, cssid: 'radio2F' },
  { floor: '1F', url: Floor1URL, raw: Floor1Raw, cssid: 'radio1F' },
]

import { CRS, LatLng } from 'leaflet'
import { LayersControl, MapContainer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import './layer-button.css' // leaflet標準cssをオーバーライド
import styles from './ysfmap.module.css'

import { SVGController, Path2Polygon, zoomRatioAndPaddings } from '@/app/lib/index.js'
import { FloorLayer } from '@/app/compoent/map/layer'

/**
 * 高さと幅を指定して地図を表示します。
 * @param {Number} picWidth
 * @param {Number} picHeight
 * @param {Number} initialFloor 初期階
 * @param {Number} id 中心にする企画id
 * @param {(ids: string[]) => void} props.onSelectIds 部屋選択時に呼び出すコールバック関数。\
 * 選択された部屋が持つ企画idの配列を受け取る。\
 * 指定しなかった場合デフォルトのポップアップが表示される
 */
export default function YSFMap({ picHeight, picWidth, initialFloor = 1, id = 'c8f366dc-65f9-43b6-99b0-29d1f43c7c3b', onSelectIds }) {
  if (!picHeight) {
    picHeight = window.innerHeight - 64
  }
  if (!picWidth) {
    picWidth = window.innerWidth
  }

  let center = [picHeight / 2, picWidth / 2]

  if (id) {
    const svgController = new SVGController(mapList[6 - initialFloor].raw)
    const Room = svgController.matchedTagAndProperty('path', 'id', (ids) => {
      return ids.split(',').includes(id)
    })[0]
    let polygon = Path2Polygon(Room.properties['d'])
    let xsum = 0, ysum = 0
    for (const point of polygon) {
      xsum += point[0]
      ysum += point[1]
    }
    const length_ = polygon.length
    const [zoomRatio, [paddingWidth, paddingHeight]] = zoomRatioAndPaddings([picWidth, picHeight], svgController.getSVGSize())
    center = [picHeight - ysum / length_ * zoomRatio - paddingHeight, xsum / length_ * zoomRatio + paddingWidth]
  }

  return (
    <div className={styles.leafletMap}>
      <MapContainer
        crs={CRS.Simple}
        center={new LatLng(center[0], center[1])}
        zoom={0}
        minZoom={0}
        maxZoom={3}
        zoomSnap={0.5}
        zoomDelta={0.5}
        style={{ height: picHeight, width: picWidth }}
        maxBounds={[[-300, -300], [picHeight + 300, picWidth + 300]]}
      >
        <LayersControl
          position="topright"
          collapsed={false}
        >
          {mapList.map((item) => { // 各階
            return (
              <LayersControl.BaseLayer
                checked={item.floor === mapList[6 - initialFloor].floor}
                name={item.floor}
                key={item.floor}
              >
                <FloorLayer
                  src={item.url}
                  raw={item.raw}
                  picHeight={picHeight}
                  picWidth={picWidth}
                  onSelectIds={onSelectIds}
                >
                </FloorLayer>
              </LayersControl.BaseLayer>
            )
          })}
        </LayersControl>
      </MapContainer>
    </div>
  )
}

/**
 * レスポンシブな幅を提供 (お好みに合わせて値をいじってください)
 * @param {Number} width
 * @returns {Number} 調整された幅
 */
/*
function widthAdjust(width) {
  return Math.min(width, width * 0.6 + 200)
}
*/

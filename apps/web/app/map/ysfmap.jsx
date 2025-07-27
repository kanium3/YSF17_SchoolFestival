'use client'

/* eslint-disable import-x/no-duplicates */
import Floor1URL from './data/bg/1.svg?url'
import Floor1Raw from './data/bg/1.svg?raw'
import Floor2URL from './data/bg/2.svg?url'
import Floor2Raw from './data/bg/2.svg?raw'
import Floor3URL from './data/bg/3.svg?url'
import Floor3Raw from './data/bg/3.svg?raw'
import Floor4URL from './data/bg/4.svg?url'
import Floor4Raw from './data/bg/4.svg?raw'
import Floor5URL from './data/bg/5.svg?url'
import Floor5Raw from './data/bg/5.svg?raw'
import Floor6URL from './data/bg/6.svg?url'
import Floor6Raw from './data/bg/6.svg?raw'

const mapList = [
  { floor: '屋上', url: Floor6URL, raw: Floor6Raw, cssid: 'radioRoof' },
  { floor: '5F', url: Floor5URL, raw: Floor5Raw, cssid: 'radio5F' },
  { floor: '4F', url: Floor4URL, raw: Floor4Raw, cssid: 'radio4F' },
  { floor: '3F', url: Floor3URL, raw: Floor3Raw, cssid: 'radio3F' },
  { floor: '2F', url: Floor2URL, raw: Floor2Raw, cssid: 'radio2F' },
  { floor: '1F', url: Floor1URL, raw: Floor1Raw, cssid: 'radio1F' },
]

import Image from 'next/image'

import { CRS, LatLng } from 'leaflet'
import { LayersControl, MapContainer } from 'react-leaflet'

import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import './layer-button.css' // leaflet標準cssをオーバーライド
import styles from './ysfmap.module.css'

import programs from '../program.mock.json'
import { parseProgramsData } from '@latimeria/core'
import { FloorLayer, FloorLayerGroupProvider, PlacePolygon } from '@/app/map/layer'
import ProgramPopup from './small-program-page.jsx'

export default function Ysfmap({ picheight, picwidth }) {
  if (!picheight) {
    picheight = window.innerHeight - 144
  }
  if (!picwidth) {
    picwidth = widthAdjust(window.innerWidth - 24)
  }
  const programsParse = parseProgramsData(programs)
  const programsList = [...programsParse.iter()]

  /** @type {[{aria:string , item:Program[]}]} */
  return (
    <div className={styles.leafletMap}>
      <MapContainer
        crs={CRS.Simple}
        center={new LatLng(picheight / 2, picwidth / 2)}
        zoom={0}
        style={{ width: picwidth, height: picheight }}
        maxBounds={[[-300, -300], [picheight + 300, picwidth + 300]]}
      >
        <LayersControl position="bottomright" collapsed={false}>
          {mapList.map((item) => {
            return (
              <LayersControl.BaseLayer checked={item.floor === '1F'} name={item.floor} key={item.floor}>
                <FloorLayerGroupProvider value={{
                  src: item.url,
                  content: item.raw,
                  picheight: picheight,
                  picwidth: picwidth,
                }}
                >
                  <FloorLayer>
                    {programsList.filter(content => content.aria.includes(item.floor)).map((content) => {
                      return (
                        <PlacePolygon
                          id={content.options.room}
                          pathOptions={{ fillOpacity: '100%', opacity: '100%' }} // どちらも0%にする (背景のsvgに任せるため)
                          key={content.id}
                        >
                          <Image src={content.options.imagePath} alt="サンプルPR画像" width={100} height={100} key={content.id} />
                          <ProgramPopup title={content.name} url={content.id} images={content.options.imagePath} area={content.aria} place={content.location} text={content.prText} />
                        </PlacePolygon>
                      )
                    })}
                  </FloorLayer>
                </FloorLayerGroupProvider>
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

function widthAdjust(width) {
  return Math.min(width, width * 0.6 + 200)
}

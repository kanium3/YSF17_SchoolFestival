'use client'

import { CRS, LatLng } from 'leaflet'
import { MapContainer, LayersControl } from 'react-leaflet'
import { FloorLayer, FloorLayerGroupProvider, PlacePolygon } from '@/app/map/layer'

/* eslint-disable import-x/no-duplicates */
import OneFloorMap from './data/bg/1.svg?url'
import OneFloorMapRaw from './data/bg/1.svg?raw'
import TwoFloorMap from './data/bg/2.svg?url'
import TwoFloorMapRaw from './data/bg/2.svg?raw'
import ThreeFloorMap from './data/bg/3.svg?url'
import ThreeFloorMapRaw from './data/bg/3.svg?raw'
import FourFloorMap from './data/bg/4.svg?url'
import FourFloorMapRaw from './data/bg/4.svg?raw'
import FiveFloorMap from './data/bg/5.svg?url'
import FiveFloorMapRaw from './data/bg/5.svg?raw'
import RoofTopMap from './data/bg/6.svg?url'
import RoofTopMapRaw from './data/bg/6.svg?raw'

import styles from './ysfmap.css'
import 'leaflet/dist/leaflet.css' // リーフレットの本体のCSSの読み込み(これしないと地図が崩れる)
import Image from 'next/image'
import Link from 'next/link'

import programs from '../program.mock.json'
import { parseProgramsData } from '@latimeria/core'
import { ariaType } from '@latimeria/core'

const ariaOrder = Object.values(ariaType)

function groupArray(array) {
  const groups = {}
  for (const item of array) {
    if (!groups[item.aria]) {
      groups[item.aria] = []
    }
    groups[item.aria].push(item)
  }
  return Object.entries(groups).map(([aria, item]) => ({ aria, item }))
}

export default function Ysfmap() {
  const programsParse = parseProgramsData(programs)
  const picwidth = 500
  const picheight = 540
  const programsArray = [...programsParse.iter()].sort((a, b) => ariaOrder.indexOf(a.aria) - ariaOrder.indexOf(b.aria))
  /** @type {[{aria:string , item:Program[]}]} */
  const ariaGroups = groupArray(programsArray)
  return (
    <div className={styles.leafletMap}>
      <MapContainer
        crs={CRS.Simple}
        center={new LatLng(picheight / 2, picwidth / 2)}
        zoom={0}
        style={{ width: picwidth, height: picheight }}
        maxBounds={[[0, 0], [picheight, picwidth]]}
      >
        <LayersControl position="bottomright" collapsed="false">
          {areaGroups.map(({area, item},))}
        </LayersControl>
      </MapContainer>
    </div>
  )
}

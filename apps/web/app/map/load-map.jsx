'use client'
import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import BottomSheet from '@/app/compoent/map/bottom-sheet'

const YSFMap = dynamic(() => import('./ysfmap.jsx'), {
  loading: () => <p style={{ height: 'calc(100vh - 64px)', width: '100vw' }}>Loading...</p>,
  ssr: false,
})

/**
 * マップページで使用するマップ
 */
export function MapWithBottomSheet() {
  const [selectedIds, setSelectedIds] = useState([])
  const MemoMap = useMemo(() => <YSFMap onSelectIds={setSelectedIds} />, [])
  return (
    <>
      {MemoMap}
      <BottomSheet ids={selectedIds} onClose={() => setSelectedIds([])} />
    </>
  )
}

/**
 * どこでも使えるマップ
 */
export function Map({ picWidth, picHeight }) {
  return (
    <YSFMap picWidth={picWidth} picHeight={picHeight} />
  )
}

/**
 * 企画ページ向けのマップ
 */
export function MapFromSpecRoom({ picWidth, picHeight, floor, id }) {
  return (
    <YSFMap picWidth={picWidth} picHeight={picHeight} initialFloor={floor} id={id} />
  )
}

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
export function Map({ picHeight, picWidth }) {
  return (
    <YSFMap picHeight={picHeight} picWidth={picWidth} />
  )
}

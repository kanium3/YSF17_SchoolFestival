'use client'
import dynamic from 'next/dynamic'
import { useState, useMemo } from 'react'
import BottomSheet from '@/app/compoent/map/bottom-sheet'

const Map = dynamic(() => import('./ysfmap.jsx'), {
  loading: () => <p style={{ height: 'calc(100vh - 64px)', width: '100vw' }}>Loading...</p>,
  ssr: false,
})

export default function MapWithBottomSheet() {
  const [selectedIds, setSelectedIds] = useState([])
  const MemoMap = useMemo(() => <Map onSelectIds={setSelectedIds} />, [])
  return (
    <>
      {MemoMap}
      <BottomSheet ids={selectedIds} onClose={() => setSelectedIds([])} />
    </>
  )
}

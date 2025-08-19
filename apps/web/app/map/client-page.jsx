'use client'

import { useEffect } from 'react'
import { MapWithBottomSheet } from '@/app/compoent/map/load-map'

export default function ClientMapPage() {
  useEffect(() => {
    document.body.classList.add('isMap')
    return () => {
      document.body.classList.remove('isMap')
    }
  }, [])

  return (
    <MapWithBottomSheet />
  )
}

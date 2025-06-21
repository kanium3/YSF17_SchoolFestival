'use client'
import dynamic from 'next/dynamic'

const Map = dynamic(() => import('./ysfmap.jsx'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
})

export default Map

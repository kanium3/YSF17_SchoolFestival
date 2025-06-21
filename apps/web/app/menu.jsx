'use client'

import { useEffect, useState } from 'react'
import { isMobile as detectIsMobile } from 'react-device-detect'
import Header from '@/app/compoent/header'
import Footer from '@/app/compoent/footer'

export default function Menu() {
  const [isMobile, setIsMobile] = useState(false)
  console.log('device:', navigator.userAgent)
  useEffect(() => {
    setIsMobile(detectIsMobile)
  }, [])
  return (
    <>
      {isMobile ? <Footer /> : <Header />}
    </>
  )
}

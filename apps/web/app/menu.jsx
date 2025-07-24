'use client'

import { isMobile } from 'react-device-detect'
import Header from '@/app/compoent/header'
import NaviFooter from '@/app/compoent/global/navi-footer'
import { ClientProvider } from '@/app/provider.jsx'
import { useEffect, useState } from 'react'

export default function Menu() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return

  return (
    <ClientProvider>
      {isMobile ? <NaviFooter /> : <Header /> }
    </ClientProvider>
  )
}

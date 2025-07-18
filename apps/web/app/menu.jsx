'use client'

import { isMobile } from 'react-device-detect'
import Header from '@/app/compoent/header'
import NaviFooter from '@/app/compoent/global/navi-footer'
import { ClientProvider } from '@/app/provider.jsx'

export default function Menu() {
  return (
    <ClientProvider>
      {isMobile ? <NaviFooter /> : <Header />}
    </ClientProvider>
  )
}

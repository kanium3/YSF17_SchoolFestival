'use client'

import { isMobile } from 'react-device-detect'
import Header from '@/app/compoent/header'
import Footer from '@/app/compoent/footer'
import { ClientProvider } from '@/app/provider.jsx'

export default function Menu() {
  return (
    <ClientProvider>
      {isMobile ? <Footer /> : <Header />}
    </ClientProvider>
  )
}

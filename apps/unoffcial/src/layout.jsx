import '@latimeria/ganoine/base.css'
import Menu from '@/menu'
import SiteFooter from '@/component/global/site-footer'
import { ClientProvider } from '@/provider.jsx'
import './globals.css'
import { Outlet } from 'react-router'

export default function RootLayout() {
  return (
    <html lang="ja">
      <head>
        <title>蒼煌祭非公式サイト</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&family=Noto+Sans+JP:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div id="content-base">
          <Menu />
          <div id="content-main">
            <ClientProvider>
              <Outlet />
            </ClientProvider>
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  )
}

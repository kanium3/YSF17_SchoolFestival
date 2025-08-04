import LazyMap from '@/app/map/load-map'
import { TitleBar } from '@/app/compoent/title-bar.jsx'
import { BrowserView, MobileView } from 'react-device-detect'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜地図',
  description: '蒼煌祭17thの非公式の地図ページです。',
}

export default function Map() {
  return (
    <div>
      <MobileView>
        <TitleBar pagename="地図" />
      </MobileView>
      <BrowserView>
        <h1>地図</h1>
      </BrowserView>
      <p>地図内をクリックすると各イベントの詳細が表示されます。</p>
      <LazyMap />
    </div>
  )
}

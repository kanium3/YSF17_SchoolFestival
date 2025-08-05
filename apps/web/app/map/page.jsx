import LazyMap from '@/app/map/load-map'
import { Titlebar } from '@/app/compoent/title-bar-supplier.jsx'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜地図',
  description: '蒼煌祭17thの非公式の地図ページです。',
}

export default function Map() {
  return (
    <div>
      <Titlebar pagename="地図" />
      <p>地図内をクリックすると各イベントの詳細が表示されます。</p>
      <LazyMap />
    </div>
  )
}

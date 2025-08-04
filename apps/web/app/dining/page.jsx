import styles from './page.module.css'
import { ImageButton } from '@/app/compoent/image-button'
import { TitleBar } from '@/app/compoent/title-bar.jsx'
import { BrowserView, MobileView } from 'react-device-detect'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜食事',
  description: '蒼煌祭17thの食事についての非公式のページです。',
}

export default function Dining() {
  return (
    <div>
      <MobileView>
        <TitleBar pagename="食事" />
      </MobileView>
      <BrowserView>
        <h1>食事</h1>
      </BrowserView>
      <p>食販やカフェテリアの情報です</p>
      {/** 別に絶対写真を使いたいわけではない */}
      {/** 押したらとかホバーで色や写真のズームを変えたい */}
      <div className={styles.buttonGrid}>
        <ImageButton name="カフェテリア" pageUrl="/dining/cafeteria" imageSrc="/dining.cafeteria.webp" />
        <ImageButton name="食販" pageUrl="/dining/foodSales" imageSrc="/dining.foodSales.webp" />
      </div>
    </div>
  )
}

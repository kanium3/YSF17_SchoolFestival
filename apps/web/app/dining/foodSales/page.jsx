import { FoodSalesElement } from './food-sales.jsx'
import TitleBarWithBack from '@/app/compoent/title-bar.jsx'
import Link from 'next/link'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜食販',
  description: '蒼煌祭17thの食販についての情報の非公式のページです。',
}

export default function FoodSales() {
  return (
    <div>
      <TitleBarWithBack backpage="/dining" pagename="食品販売" />
      {/** こういう場合Linkとaどっちのほうがいいんだろ */}
      <p>
        <Link href="#how-to-use-foodSales">食販の使い方</Link>
        も併せてお読みください
      </p>
      <div style={{ paddingBottom: '0rem' }}>
        <h1>食販団体一覧</h1>
        {/** スマホ想定の文字サイズ */}

        <p>
          アレルギー表は
          <Link href="/dining/foodSales/allergyTable" target="_blank" rel="noopener noreferrer">こちら(新規タブで開きます)</Link>
        </p>
        <FoodSalesElement />

        {/** <div id="foodSaleMenus" className={styles.foodSalesMenuArea}>

        </div> */}
      </div>
      <div id="how-to-use-foodSales">
        <h1>食販の使い方</h1>
        <iframe
          src="https://docs.google.com/presentation/d/e/2PACX-1vRSvoPrrU09BtDllWGcO3DX-EMw352OwDCt9hkw02RBTGMx-iumWjVnqMANDBV99leJqEyKKtKIeyIi/pubembed?start=false&loop=false&delayms=5000"
          border="none"
          width={320}
          height={190}
          allowFullScreen={true}
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
        >
        </iframe>
      </div>
    </div>
  )
}

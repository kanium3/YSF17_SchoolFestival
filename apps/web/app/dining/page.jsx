import { ImageButton } from './image-button'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜食事',
  description: '蒼煌祭17thの食事についての非公式のページです。',
}

export default function Dining() {
  return (
    <div>
      <h2>食事</h2>
      <p>食販やカフェテリアの情報です</p>
      {/** 別に絶対写真を使いたいわけではない */}

      <ImageButton name="カフェテリア" pageUrl="/dining/cafeteria" imageSrc="/dining.cafeteria.webp" />
      <ImageButton name="食販" pageUrl="/dining/foodSales" imageSrc="/dining.foodSales.webp" />

    </div>
  )
}

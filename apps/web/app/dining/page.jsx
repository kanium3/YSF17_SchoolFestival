import styles from './page.module.css'
import { solveBasePath } from '@/app/lib/index.js'
import Image from 'next/image'
import Link from 'next/link'

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
      {/** 画像に薄めの白/黒を重ねたかったけどやり方が分からなかった */}
      <div className={styles.imagebutton}>
        <Link href="/dining/cafeteria">
          {/** たくさんの席を写したカフェテリアの写真とか？ */}
          <Image
            src={solveBasePath('/dining.cafeteria.webp')}
            alt="いい感じのカフェテリアの画像"
            width={560}
            height={330}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.imagebuttonImage}></div>
          <h1>カフェテリア</h1>
        </Link>
      </div>
      <div className={styles.imagebutton}>
        <Link href="/dining/foodSales">
          {/** 食販 */}
          <Image
            src={solveBasePath('/dining.foodSales.webp')}
            alt="いい感じの食販の画像"
            className={styles.imagebuttonImage}
            width={560}
            height={330}
            style={{ objectFit: 'cover' }}
          />
          <div className={styles.imagebuttonImage}></div>
          <h1>食販</h1>
        </Link>
      </div>
    </div>
  )
}

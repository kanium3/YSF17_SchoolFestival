import cafeteria from '../../cafeteria.mock.json'
import styles from './page.module.css'
import { TitleBarWithBack } from '@/app/compoent/title-bar.jsx'
import { MenuExporter } from './cafeteriamenu-exporter'
import { solveBasePath } from '@/app/lib/index.js'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜カフェテリア',
  description: '蒼煌祭17thのカフェテリアについての情報の非公式のページです。',
}

export default function Cafeteria() {
  return (
    <div>
      <TitleBarWithBack backpage={solveBasePath('/dining')} pagename="カフェテリア" />
      <div>
        <h1>メニュー</h1>
        {/** ysf at wikiの情報を使用、値上げ後の値段が不明。 */}
        {/** メニューすら覚えていないので暫定 */}
        {/** CSSいい感じにお願いします */}
        <div className={styles.priceTable} style={{ maxWidth: '100vw' }}>
          <table className={styles.priceTable} style={{ maxWidth: '100vw' }}>

            <MenuExporter />

          </table>
        </div>
      </div>
      <div>
        <h1 style={{ paddingTop: '1rem' }}>注意事項</h1>
        <ul className={styles.bulletedList}>
          {/** 箇条書きのルールも必要？ */}

          {cafeteria.notes.map(item => (
            <li key={item}>{item}</li>
          ))}

          {/** <li>非公式情報です。情報に誤りがある可能性があります。</li>
          <li>
            食券を買い、そのメニューの列に並んでください。途中、通路がありますので詰めすぎないようにお気を付けください。
          </li>
          <li>容器は使い捨てです。</li> */}
        </ul>
      </div>
    </div>
  )
}

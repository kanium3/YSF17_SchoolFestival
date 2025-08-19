import cafeteria from '../../cafeteria.mock.json'
import styles from './page.module.css'
import { TitleBarWithBack } from '@/component/global/title-bar.jsx'
import { MenuExporter } from './cafeteriamenu-exporter'
import { Callout } from '@latimeria/ganoine'

export default function Cafeteria() {
  return (
    <div>
      <title>カフェテリア - 蒼煌祭17th非公式ページ</title>
      <meta name="description" content="蒼煌祭17thのカフェテリアについての情報の非公式のページです。" />
      <TitleBarWithBack backpage="/dining" pagename="カフェテリア" />
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
        <Callout kind="warn">
          <ul className={styles.bulletedList}>
            {/** 箇条書きのルールも必要？ */}

            {cafeteria.warn.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Callout>
        <Callout kind="info">
          <ul className={styles.bulletedList}>
            {/** 箇条書きのルールも必要？ */}

            {cafeteria.notes.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Callout>
      </div>
    </div>
  )
}

import './home.css'
import styles from './page.module.css'
import WarnCallout from '@/app/compoent/warn-callout.jsx'
import { Countdown } from '@/app/compoent/countdown.jsx'
import HomeArticleDisplay from '@/app/compoent/home/home-article-display.jsx'
import { solveBasePath } from '@/app/lib/index.js'
import Image from 'next/image'

export const metadata = {
  title: '蒼煌祭17th非公式ページ｜トップ',
  description: '蒼煌祭17thの非公式のページのトップです。',
}

export default function Home() {
  const now = new Date()
  const openingTime = new Date('2025-09-06T10:00+09:00')
  const closingTime = new Date('2025-09-07T15:00+09:00')
  let state = now < openingTime ? 'unopen' : (now < closingTime ? 'opened' : 'closed')

  return (
    <div className={styles.page}>
      <div id="top_visual" className={styles.topVisualContainer}>
        {/* 仮作成のトップです */}
        <Image
          className={styles.topImage}
          src={solveBasePath('/ysf_top.png')}
          alt="横浜サイエンスフロンティア高校の画像です"
          width={780}
          height={450}
        />
        <div className={
          `${styles.top_cover} 
          ${state == 'unopen' ? styles.coverUnopen : ''} 
          ${state == 'opened' ? styles.coverOpened : ''}
          ${state == 'closed' ? styles.coverClosed : ''}`
        }
        >
        </div>
        <div className={styles.topInfoContainer}>
          <p className={styles.headText} style={{ padding: '0' }}>蒼煌祭非公式HP</p>
        </div>
        <div className={styles.middleInfoContainer}>
          <div style={state == 'unopen' ? {} : { display: 'none' }}>
            <p className={styles.countdownText}>蒼煌祭の開催まで</p>
            <Countdown />
          </div>
          <div style={state == 'closed' ? {} : { display: 'none' }}>
            <p className={styles.closedText1}>第17回蒼煌祭は終了しました</p>
            <p className={styles.closedText2}>
              たくさんの方のご来場
              <br />
              ありがとうございました！
            </p>
          </div>
        </div>
        <div className={styles.subInfoContainer}>
          <p className={styles.subtitle}>17th SOKO-FESTIVAL</p>
          <h1 className={styles.title}>
            蒼煌祭
            <span className={styles.title_thin}>「</span>
            澄
            <span className={styles.title_thin}>」</span>
          </h1>
          <p className={styles.titleInfo}>@YSFH・YSFJH</p>
          <p className={styles.titleInfo}>9/6 - 9/7 10:00≫15:00</p>
        </div>
      </div>

      <div className="contentBox">
        <WarnCallout>
          <p>
            このサイトは非公式の有志による情報まとめサイトです。
            正確な情報提供を目指していますが、不確実な情報が含まれているかもしれません。
            確実な情報はこちら(公式ホームページ)からご覧ください。
          </p>
        </WarnCallout>
      </div>

      <div id="home_aboutFest" className="contentBox">
        <h2>蒼煌祭について</h2>
        <p>蒼煌祭いろいろ書きこみ書きこみ</p>
      </div>

      <div className="contentBox">
        <h2>特集</h2>
        <p>蒼煌祭をもっと知りたい方、楽しみたい方はぜひご覧ください！</p>
        <HomeArticleDisplay />
      </div>

      <div id="home_notice" className="contentBox">
        <h2>来場に際しての注意</h2>
        <div>
          <iframe
            src="https://docs.google.com/presentation/d/e/2PACX-1vTmQeHPzEP7-2RDqIVzUkOWsNH-c_viIoOE3gNlkJxcR_7I-ruZBBRb4qJEOJr3itFXMYjF-DLjRTB4/pubembed?start=false&loop=true&delayms=5000"
            border="none"
            allowFullScreen={true}
            mozallowfullscreen="true"
            webkitallowfullscreen="true"
            className="slide"
          >
          </iframe>
        </div>
      </div>

      <div id="home_access" className="contentBox">
        <h2>アクセス</h2>
        <p>アクセスは...</p>
        <div className="slide">
          <iframe
            id="YSFmap"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1365.7115110267134!2d139.67723936730562!3d35.49864772128194!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60185de48a090f23%3A0xb7f74d21bfdfd5f4!2z5qiq5rWc5biC56uL5qiq5rWc44K144Kk44Ko44Oz44K544OV44Ot44Oz44OG44Kj44Ki6auY562J5a2m5qCh!5e0!3m2!1sja!2sjp!4v1749479456850!5m2!1sja!2sjp"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          >
          </iframe>
        </div>
        <div>
          <h3>時刻表</h3>
          <div id="container_trainTimetable">
            <div>
              <p>JR鶴見線</p>
              <a className="button_trainTimetable touchable">鶴見小野駅</a>
            </div>
            <div>
              <p>京急</p>
              <a className="button_trainTimetable touchable">花月総持寺駅</a>
            </div>
          </div>
        </div>
      </div>

      <div id="home_source" className="contentBox">
        <h2>このサイトの情報源</h2>
        <p>情報源</p>
      </div>
    </div>
  )
}

import { NavLink } from 'react-router'
import matter from 'gray-matter'
import HomeArticleBox from './home-article-box.jsx'
import { MdArrowForwardIos } from 'react-icons/md'
import styles from './home-article-display.module.css'
import { loadPostContents } from '@/feature/lib/load-post-contents.js'

export default function HomeArticleDisplay() {
  /** @type {MdSchema[]} */
  const featureData = []
  const postContents = loadPostContents()

  for (const content of postContents) {
    const { data } = matter(content)
    featureData.push(data)
  }
  const display_articlesIndex = [0, 1, 0]
  const articles = display_articlesIndex.map(x => <HomeArticleBox data={featureData[x]} key={featureData[x].title} />)

  return (
    <div className={styles.displayBox}>
      <div>
        {articles}
      </div>
      <NavLink className={styles.viewMore} to="/feature">
        {`もっと見る(全${articles.length}件)`}
        <MdArrowForwardIos />
      </NavLink>
    </div>
  )
}

import matter from 'gray-matter'
import FeatureCard from '@/feature/feature-card'
import style from './page.module.css'
import { Titlebar } from '@/component/global/title-bar-supplier.jsx'
import { loadPostContents } from './lib/load-post-contents.js'

export const metadata = {
  title: '特集一覧 - 蒼煌祭17th非公式ページ',
  description: '蒼煌祭17thの非公式の特集の一覧のページです。',
}

export default function Features() {
  /** @type {MdSchema[]} */
  const featureData = []
  const postContents = loadPostContents()

  for (const content of postContents) {
    const { data } = matter(content.content)
    data.link = content.postId
    featureData.push(data)
  }
  return (
    <div>
      <div>
        <Titlebar pagename="特集" />
      </div>
      <div className={style.featureView}>
        {featureData.map(data => (
          <FeatureCard data={data} key={data.title} />
        ))}
      </div>
    </div>
  )
}

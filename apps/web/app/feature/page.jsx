import fs from 'node:fs'
import matter from 'gray-matter'
import FeatureCard from '@/app/feature/feature-card'
import style from './page.module.css'
import { Titlebar } from '@/app/compoent/title-bar-supplier.jsx'

export default async function Features() {
  const directoryFiles = await fs.promises.readdir('posts')
  const featureData = []
  for (const directoryFile of directoryFiles) {
    const content = await fs.promises.readFile(`posts/${directoryFile}`, { encoding: 'utf8' })
    let meta = matter(content)
    meta.data.link = `/feature/${directoryFile.replace(/\.md$/, '')}`
    featureData.push(meta.data)
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

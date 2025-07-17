import Link from 'next/link'
import fs from 'node:fs'
import matter from 'gray-matter'
import { Home_articleBox } from './home-article-box.jsx'

export default async function Home_articleDisplay() {
    const directoryFiles = await fs.promises.readdir('posts')
    const featureData = []
    for (const directoryFile of directoryFiles) {
        const content = await fs.promises.readFile(`posts/${directoryFile}`, { encoding: 'utf8' })
        let meta = matter(content)
        meta.data.link = `/feature/${directoryFile.replace(/\.md$/, '')}`
        featureData.push(meta.data)
    }
    const display_articlesIndex = [0];
    const articles = display_articlesIndex.map((x, i) => <Home_articleBox data={display_articlesIndex[x]} key={i} />)

    return (
        <>
            <div>
                {articles}
            </div>
            <Link href={'/feature'}>{`もっと見る(全${articles.length}件)`}</Link>
        </>
    )
}
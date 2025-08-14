import fs from 'node:fs'
import matter from 'gray-matter'
import Markdown from 'react-markdown'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough'
import remarkFrontmatter from 'remark-frontmatter'
import { TitleBarWithBack } from '@/component/global/title-bar'
import { loadPostContents } from '@/feature/lib/load-post-contents.js'
import { useParams } from 'react-router'

export async function generateMetadata({ params }) {
  // read route params
  const { slug } = await params
  const path = slug + '.md'
  const content = await fs.promises.readFile(`posts/${path}`, { encoding: 'utf8' })

  // fetch data
  const { data } = matter(content)
  const pageTitle = data.title || '無題'
  return {
    title: `${pageTitle} - 蒼煌祭17th非公式ページ`,
    description: `蒼煌祭17thの非公式の特集「${pageTitle}」のページです。`,
  }
}

/**
 *
 * @returns {React.ReactNode}
 * @constructor
 */
export default function Post() {
  const { postId } = useParams()
  const postContents = loadPostContents()
  const post = postContents.find(data => data.postId === postId)
  const { data } = matter(post.content)
  const pageTitle = data.title || '無題'
  return (
    <>
      <TitleBarWithBack backpage="/feature" pagename={pageTitle} />
      <Markdown
        remarkPlugins={[[remarkFrontmatter, { type: 'yaml', marker: '-' }], remarkGfm, remarkCjkFriendly, remarkCjkFriendlyGfmStrikethrough, remarkDirective, remarkDirectiveRehype]}
      >
        {post.content}
      </Markdown>
    </>
  )
}

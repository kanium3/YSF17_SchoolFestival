import fs from 'node:fs'
import matter from 'gray-matter'
import { MarkdownAsync } from 'react-markdown'
import remarkDirective from 'remark-directive'
import remarkDirectiveRehype from 'remark-directive-rehype'
import remarkGfm from 'remark-gfm'
import remarkCjkFriendly from 'remark-cjk-friendly'
import remarkCjkFriendlyGfmStrikethrough from 'remark-cjk-friendly-gfm-strikethrough'
import remarkFrontmatter from 'remark-frontmatter'

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
  const directoryFiles = await fs.promises.readdir('posts')
  let posts = []
  for (const path of directoryFiles) {
    const content = await fs.promises.readFile(`posts/${path}`, { encoding: 'utf8' })
    const information = matter(content)
    posts.push({
      information: information.data,
    })
  }
  return posts.map(({ information }) => {
    return {
      slug: information.slug ?? information.title,
    }
  })
}

/**
 *
 * @param {Promise<{ slug: string }>} params
 * @returns {Promise<React.ReactNode>}
 * @constructor
 */
export default async function Post({ params }) {
  const { slug } = await params
  const path = slug + '.md'
  const content = await fs.promises.readFile(`posts/${path}`, { encoding: 'utf8' })
  return (
    <MarkdownAsync
      remarkPlugins={[[remarkFrontmatter, { type: 'yaml', marker: '-' }], remarkGfm, remarkCjkFriendly, remarkCjkFriendlyGfmStrikethrough, remarkDirective, remarkDirectiveRehype]}
    >
      {content}
    </MarkdownAsync>
  )
}

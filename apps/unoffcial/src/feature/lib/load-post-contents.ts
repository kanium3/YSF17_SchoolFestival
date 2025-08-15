export type loadPostData = {
  postId: string
  content: string
}

export function loadPostContents() {
  // src/posts
  const context = import.meta.webpackContext('../../posts', {
    recursive: true,
    regExp: /\.md$/,
  })

  const mdContents: loadPostData[] = []

  for (const name of context.keys()) {
    // MEMO: name format shows `./<post_name>.md`
    // And mdContent is raw content of markdown file because of rsbuild setting
    const mdContent = context(name) as string

    mdContents.push({
      postId: name.replace(/\.md$/, '').replace('./', ''),
      content: mdContent,
    })
  }

  return mdContents
}

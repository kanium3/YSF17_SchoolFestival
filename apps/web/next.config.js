import withRspack from 'next-rspack'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  webpack(config) {
    // These settings are from https://react-svgr.com/docs/next/
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/, /raw/] },
        use: ['@svgr/webpack'],
      },
      {
        resourceQuery: /raw/, // *.*?raw
        type: 'asset/source',
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },
}

export default withRspack(nextConfig)

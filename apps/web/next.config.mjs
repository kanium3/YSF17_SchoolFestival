import withRspack from 'next-rspack'
import LicensePlugin from 'webpack-license-plugin'
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  /** @param {import('@rspack/core').RspackOptions} config */
  webpack(config) {
    // These settings are from https://react-svgr.com/docs/next/
    const fileLoaderRule = config.module.rules.find(rule =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      {
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/, /raw/] },
        use: ['@svgr/webpack'],
      },
      {
        test: /\.svg$/i,
        resourceQuery: /raw/, // *.*?raw
        type: 'asset/source',
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    config.plugins.push(
      new LicensePlugin({
        outputFilename: 'meta/licenses.json',
      }),
    )

    if (process.env.ANALYZE) {
      if (config.name === 'client') {
        config.plugins.push(
          new RsdoctorRspackPlugin({
            disableClientServer: true,
            features: ['bundle'],
          }),
        )
      }
      else if (config.name === 'server') {
        config.plugins.push(
          new RsdoctorRspackPlugin({
            disableClientServer: true,
            output: {
              reportDir: './.next/server',
            },
            features: ['bundle'],
          }),
        )
      }
    }

    return config
  },
}

export default withRspack(nextConfig)

import { join, dirname } from "path"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

/** @type { import('storybook-react-rsbuild').StorybookConfig } */
const config = {
  framework: 'storybook-react-rsbuild',
  stories: [
    "../packages/**/*.mdx",
    "../packages/**/*.story.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    getAbsolutePath('@storybook/addon-docs'),
    getAbsolutePath("@storybook/addon-a11y")
  ],
  rsbuildFinal(config) {
    return config
  }
};
export default config;
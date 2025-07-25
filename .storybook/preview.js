import '../packages/ganoine/src/extra/base.css'

/** @type { import('storybook-react-rsbuild').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
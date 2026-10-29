import '../src/styles/base.css';

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'lightest',
      values: [
        { name: 'lightest', value: '#F1EDE6' },
        { name: 'cream', value: '#EBE3DB' },
        { name: 'sand', value: '#D1C7BD' },
        { name: 'gold', value: '#CBAD8D' },
        { name: 'dark', value: '#3A2D28' },
        { name: 'white', value: '#ffffff' },
      ],
    },
  },
};

export default preview;

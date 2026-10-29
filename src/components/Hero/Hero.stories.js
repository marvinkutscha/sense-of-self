import { createHero } from './Hero';

export default {
  title: 'Components/Hero (Afternoon Sunlight)',
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    headline: { control: 'text' },
    subline: { control: 'text' },
  },
};

export const DefaultHero = (args) => createHero(args);

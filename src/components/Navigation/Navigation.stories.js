import { createNavigation } from './Navigation';

export default {
  title: 'Components/Navigation',
  argTypes: {
    theme: {
      control: { type: 'select' },
      options: ['light', 'dark'],
      description: 'Adaptives Header-Theme (Hell für Hero/Angebote, Dunkel für Begleitung/Footer)',
    },
    onBookingClick: { action: 'bookingClicked' },
  },
};

export const LightTheme = (args) => createNavigation({ ...args, theme: 'light' });
export const DarkTheme = (args) => createNavigation({ ...args, theme: 'dark' });

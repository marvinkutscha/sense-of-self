import { createBookingFlow } from './BookingFlow';

export default {
  title: 'Components/Booking Flow (Conversational)',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Step2_TierSelection = () => createBookingFlow({ initialStep: 2 });

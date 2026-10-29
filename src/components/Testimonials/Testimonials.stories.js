import { createTestimonialsSection } from './Testimonials';

export default {
  title: 'Components/Testimonials Carousel',
  parameters: {
    layout: 'fullscreen',
  },
};

export const Carousel = () => createTestimonialsSection({
  onOpenStory: (id) => alert(`Öffne kompletten Erfahrungsbericht für: ${id}`),
});

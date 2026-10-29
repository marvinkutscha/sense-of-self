import { createOfferCard, createOffersGrid } from './OfferCard';

export default {
  title: 'Components/Offer Cards',
  parameters: {
    layout: 'padded',
  },
};

const sampleOffers = [
  {
    id: 'akasha',
    eyebrow: 'Einzellesung & Paket',
    title: 'Akasha-Chronik-Lesung',
    price: '108 €',
    duration: 'ca. 60–90 Min.',
    description: 'In einer Lesung öffne ich einen Raum, in dem du Antworten auf deine Fragen findest – aus einem tieferen Wissen heraus, jenseits des Verstands.',
  },
  {
    id: 'human-design',
    eyebrow: 'Persönliche Potenzialanalyse',
    title: 'Human Design Basis-Lesung',
    price: '159 €',
    duration: 'ca. 75 Min.',
    description: 'Verstehe deine angeborene energetische Blaupause: Energietyp, Strategie, Autorität und Profil für mehr Leichtigkeit im Alltag.',
  },
  {
    id: 'yoga',
    eyebrow: 'In Berlin-Charlottenburg',
    title: 'Yoga-Kreis',
    price: '18 €',
    duration: '90 Min.',
    description: 'Wöchentlicher Kreis aus Asana, Pranayama & Meditation in einem warmen, sicheren Raum zur Verbindung mit deinem Körper.',
  },
];

export const SingleCard = () => createOfferCard(sampleOffers[0]);

export const FullGrid = () => createOffersGrid({
  offers: sampleOffers,
  onSelectOffer: (id) => alert(`Selected offer: ${id}`),
});

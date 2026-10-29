import './OfferCard.css';

export const createOfferCard = ({
  eyebrow = 'Akasha-Chronik',
  title = 'Akasha-Chronik-Lesung',
  price = '108 €',
  duration = 'ca. 60–90 Min.',
  description = 'In einer Akasha-Chronik-Lesung öffnen wir einen geschützten Raum für die Fragen deines Herzens.',
  onSelect
}) => {
  const card = document.createElement('div');
  card.className = 'offer-card';

  card.innerHTML = `
    <div class="card-inner">
      <span class="eyebrow">${eyebrow}</span>
      <h3 class="card-title">${title}</h3>
      <div class="card-price-badge">${price} · <small>${duration}</small></div>
      <p class="card-desc">${description}</p>
      <button type="button" class="btn btn-card-details">Details ansehen & buchen →</button>
    </div>
  `;

  const btn = card.querySelector('.btn-card-details');
  if (btn && onSelect) {
    btn.addEventListener('click', onSelect);
  }

  return card;
};

export const createOffersGrid = ({ offers, onSelectOffer }) => {
  const grid = document.createElement('div');
  grid.className = 'offers-grid';
  offers.forEach(o => {
    grid.appendChild(createOfferCard({ ...o, onSelect: () => onSelectOffer && onSelectOffer(o.id) }));
  });
  return grid;
};

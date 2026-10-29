import './BookingFlow.css';

export const createBookingFlow = ({ initialOffer = 'akasha', initialStep = 1 }) => {
  const container = document.createElement('div');
  container.className = 'booking-preview-container';

  container.innerHTML = `
    <div class="booking-dialog-card">
      <div class="booking-header-bar">
        <span class="step-badge">Schritt 2 von 7 · Deine Variante</span>
      </div>

      <div class="booking-body">
        <p class="eyebrow" style="color: #3A2D28;">Deine Variante</p>
        <h2 style="font-size: 1.6rem; margin: 6px 0 10px;">Welche Variante wünschst du dir, Clara?</h2>
        <p style="color: var(--text-copy); margin-bottom: 24px;">Wähle die passende Option für dein persönliches Anliegen:</p>

        <div class="conv-tiers-grid">
          <div class="conv-tier-card selected">
            <div class="tier-radio"></div>
            <div class="tier-info">
              <div class="tier-head-row">
                <strong>Einzelne Lesung</strong>
                <span class="tier-price-badge">108 €</span>
              </div>
              <p>Eine Lesung (ca. 60–90 Min.) zu deiner aktuellen Herzensfrage.</p>
            </div>
          </div>

          <div class="conv-tier-card">
            <div class="tier-radio"></div>
            <div class="tier-info">
              <div class="tier-head-row">
                <strong>4 Lesungen im Paket</strong>
                <span class="tier-price-badge">360 €</span>
              </div>
              <p>90 € pro Lesung · Gültig innerhalb von 6 Monaten für tiefe Transformation.</p>
            </div>
          </div>
        </div>

        <div class="booking-nav-row">
          <button type="button" class="btn-ghost">← Zurück</button>
          <button type="button" class="btn">Weiter zu Schritt 3 →</button>
        </div>
      </div>
    </div>
  `;

  return container;
};

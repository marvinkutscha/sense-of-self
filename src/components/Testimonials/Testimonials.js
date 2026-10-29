import './Testimonials.css';

export const createTestimonialsSection = ({ onOpenStory }) => {
  const section = document.createElement('section');
  section.className = 'erfahrungen-section';
  section.id = 'erfahrungen';

  const reviews = [
    {
      id: 'max',
      name: 'Max',
      meta: 'Akasha-Chronik-Lesung',
      quote: '„Dank Claras feinfühliger Begleitung konnte ich unangenehme Erfahrungen aus meiner Vergangenheit nochmal anders erleben, geliebte Menschen um mich herum spüren und meinen persönlichen Safe Place finden.“',
    },
    {
      id: 'mercedes',
      name: 'Mercedes',
      meta: 'Akasha-Chronik-Lesung',
      quote: '„Ein paar Tage nach der Lesung erlebte ich magische Momente und spürte, wie ich immer mehr in meinen Flow kam.“',
    },
    {
      id: 'maren',
      name: 'Maren',
      meta: 'Akasha-Chronik-Lesung',
      quote: '„Manchmal fühlte ich mich wie energetisch eingehüllt, dann wieder liebevoll umarmt. Mir wurde einmal mehr klar, dass ich getragen und unterstützt werde.“',
    },
    {
      id: 'jule',
      name: 'Jule',
      meta: 'Akasha-Chronik-Lesung',
      quote: '„Die Lesung war für mich eine sehr bereichernde Erfahrung. Ich habe danach das Gefühl, wieder mehr mit mir in Kontakt zu sein.“',
    }
  ];

  section.innerHTML = `
    <div class="wrap erfahrungen-wrap">
      <div class="section-head-split">
        <div>
          <p class="eyebrow">Erfahrungen</p>
          <h2 style="margin:0;">Was andere erlebt haben</h2>
        </div>
        <div class="carousel-nav-arrows">
          <button type="button" class="carousel-arrow-btn prev-btn" aria-label="Vorherige">←</button>
          <button type="button" class="carousel-arrow-btn next-btn" aria-label="Nächste">→</button>
        </div>
      </div>

      <div class="testimonials-carousel-wrapper">
        <div class="testimonials-carousel-track">
          ${reviews.map(r => `
            <div class="testimonial-carousel-card">
              <div class="testimonial-card-box">
                <div>
                  <div class="quote-lead-symbol">“</div>
                  <blockquote class="testimonial-card-quote">${r.quote}</blockquote>
                </div>
                <div class="testimonial-card-bottom">
                  <div>
                    <div style="font-weight:700; color:#000;">${r.name}</div>
                    <div style="font-size:0.88rem; color:#A48374;">${r.meta}</div>
                  </div>
                  <button type="button" class="btn-open-story-dialog" data-story="${r.id}">
                    <span>Ganzen Bericht lesen →</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  const track = section.querySelector('.testimonials-carousel-track');
  section.querySelector('.prev-btn').addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });
  section.querySelector('.next-btn').addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });

  section.querySelectorAll('.btn-open-story-dialog').forEach(btn => {
    btn.addEventListener('click', () => {
      if (onOpenStory) onOpenStory(btn.getAttribute('data-story'));
    });
  });

  return section;
};

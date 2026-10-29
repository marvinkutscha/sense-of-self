import './Navigation.css';

export const createNavigation = ({ theme = 'light', onBookingClick }) => {
  const header = document.createElement('header');
  header.className = 'site-header';
  if (theme === 'dark') {
    header.setAttribute('data-theme', 'dark');
  }

  header.innerHTML = `
    <div class="progressive-blur-container" aria-hidden="true">
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
      <div class="blur-filter"></div>
    </div>
    <div class="wrap site-header-wrap">
      <a class="brand" href="#start" aria-label="Sense of Self – Startseite">
        <span class="brand-name">Sense of Self</span>
      </a>
      <button class="menu-toggle" aria-label="Menü öffnen"><span></span><span></span></button>
      <nav class="nav" id="nav">
        <a href="#start">Start</a>
        <a href="#begleitung">Wie ich dich begleite</a>
        <a href="#angebote">Angebote</a>
        <a href="#erfahrungen">Erfahrungen</a>
        <a href="#ueber-mich">Über mich</a>
        <a href="#kontakt" class="btn btn-nav">Termin anfragen</a>
      </nav>
    </div>
  `;

  const btn = header.querySelector('.btn-nav');
  if (btn && onBookingClick) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      onBookingClick();
    });
  }

  return header;
};

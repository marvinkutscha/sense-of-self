import './Footer.css';

export const createFooter = () => {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';

  footer.innerHTML = `
    <div class="wrap footer-wrap">
      <div class="footer-grid">
        <div>
          <a class="brand" href="#start" aria-label="Sense of Self">
            <span class="brand-name">Sense of Self</span>
          </a>
          <p class="footer-tagline">Lesungen online und vor Ort · Yoga-Kreis in Berlin-Charlottenburg</p>
        </div>
        <div>
          <h4>Kontakt</h4>
          <ul>
            <li><a href="mailto:Clara.b@icloud.com">Clara.b@icloud.com</a></li>
            <li><a href="https://instagram.com/clara_bergener" target="_blank" rel="noopener">Instagram</a></li>
          </ul>
        </div>
        <div>
          <h4>Angebote</h4>
          <ul>
            <li><a href="#angebote">Akasha-Chronik-Lesung</a></li>
            <li><a href="#angebote">Human-Design-Lesung</a></li>
            <li><a href="#angebote">Yoga-Kreis</a></li>
          </ul>
        </div>
        <div>
          <h4>Rechtliches</h4>
          <ul>
            <li><a href="#impressum">Impressum</a></li>
            <li><a href="#datenschutz">Datenschutz</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} Clara-Johanna Bergener · Sense of Self. Alle Rechte vorbehalten.</p>
      </div>
    </div>
  `;

  return footer;
};

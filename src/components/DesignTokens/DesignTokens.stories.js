import '../../styles/base.css';

export default {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
  },
};

export const SkinTonePalette = () => {
  const swatches = [
    { name: 'Darkest Umber', hex: '#3A2D28', role: 'Footer, Dark Section Accent, Primary Dark Type' },
    { name: 'Warm Terracotta', hex: '#A48374', role: 'Borders, Subtitles, Subtle Badges' },
    { name: 'Golden Tan', hex: '#CBAD8D', role: 'Erfahrungen Section, Sunlight Highlights' },
    { name: 'Sand Pebble', hex: '#D1C7BD', role: 'Über Mich Section, Neutral Contours' },
    { name: 'Soft Cream Linen', hex: '#EBE3DB', role: 'Angebote & Kontakt Sections, Soft Cards' },
    { name: 'Alabaster Porcelain', hex: '#F1EDE6', role: 'Hero Section Base, Light Background' },
  ];

  const container = document.createElement('div');
  container.style.maxWidth = '900px';
  container.style.margin = '0 auto';
  container.innerHTML = `
    <h2 style="font-family: var(--font-headline); margin-bottom: 8px;">Sense of Self – 6 Hautfarbtöne</h2>
    <p style="color: var(--text-copy); margin-bottom: 32px;">Exakte Skin-Tone-Farbpalette zur emotionalen, warmen Gestaltung aller Sektionen.</p>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
      ${swatches.map(s => `
        <div style="border-radius: 20px; overflow: hidden; background: #fff; box-shadow: var(--box-shadow-card); border: 1px solid var(--border-subtle);">
          <div style="height: 120px; background-color: ${s.hex};"></div>
          <div style="padding: 18px 20px;">
            <div style="font-weight: 700; font-family: var(--font-headline); font-size: 1.15rem; color: #000;">${s.name}</div>
            <code style="font-size: 0.95rem; color: #555; background: #f0ece9; padding: 2px 8px; border-radius: 6px; display: inline-block; margin: 6px 0;">${s.hex}</code>
            <p style="font-size: 0.88rem; color: var(--text-muted); margin: 6px 0 0; line-height: 1.4;">${s.role}</p>
          </div>
        </div>
      `).join('')}
    </div>
  `;
  return container;
};

export const Typography = () => {
  const container = document.createElement('div');
  container.style.maxWidth = '900px';
  container.style.margin = '0 auto';
  container.innerHTML = `
    <h2 style="font-family: var(--font-headline); margin-bottom: 8px;">Typografie & Schriftsystem</h2>
    <p style="color: var(--text-copy); margin-bottom: 32px;">Marcellus für Headlines & Geist für Fließtexte.</p>

    <div style="background:#fff; border-radius:24px; padding:36px; border:1px solid var(--border-subtle); margin-bottom:24px;">
      <span class="eyebrow">Headline Font</span>
      <h1 style="font-size: 2.8rem; margin: 10px 0 16px;">Du bist vollkommen. Genau so, wie du bist.</h1>
      <p style="font-size: 0.92rem; color: var(--text-muted);">Marcellus Serif (weight: 400, letter-spacing: 0.015em)</p>
    </div>

    <div style="background:#fff; border-radius:24px; padding:36px; border:1px solid var(--border-subtle);">
      <span class="eyebrow">Body Font</span>
      <p style="font-size: 1.15rem; line-height: 1.7; margin: 10px 0;">
        Vielleicht kennst du den leisen Wunsch, wieder mehr bei dir selbst anzukommen. In einer Welt voller Erwartungen lade ich dich ein, innezuhalten – und dich daran zu erinnern, wer du im Kern bist.
      </p>
      <p style="font-size: 0.92rem; color: var(--text-muted);">Geist Regular (400) / Medium (500) / SemiBold (600)</p>
    </div>
  `;
  return container;
};

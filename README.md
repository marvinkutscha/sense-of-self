# Sense of Self – Design System & Storybook

Dieses Repository enthält die Website von **Sense of Self** sowie das modulare **Storybook Design System**.

---

## 🚀 Storybook starten

Um Storybook lokal im Browser zu öffnen und alle Komponenten isoliert zu testen und anzupassen:

```bash
npm run storybook
```

Storybook öffnet sich automatisch unter:  
👉 **http://localhost:6006**

---

## 🧱 Modulare Komponenten-Struktur (`src/`)

Das Design ist sauber in wiederverwendbare, isolierte Module unterteilt:

```
src/
├── styles/
│   ├── tokens.css           # 6 Hauttöne, Schriften (Roboto Flex & Inter), Spacing (5vw)
│   └── base.css             # Globale Resets, Buttons, Typografie
└── components/
    ├── DesignTokens/        # Farbpalette & Typografie-Showcase
    ├── Navigation/          # Header-Logo (0.98rem), Links, 5vw Padding, Light/Dark-Theme
    ├── Hero/                # Afternoon Sunlight WebGL Shader Canvas & Text (5vw Abstand)
    ├── OfferCard/           # Angebots-Karten (Akasha, Human Design, Yoga) & Grid
    ├── Testimonials/        # Testimonial-Carousel (kein Abschneiden) & Story-Modal
    ├── BookingFlow/         # 7-Schritte Conversational Booking Flow (Deine Variante etc.)
    └── Footer/              # 4-Spalten Footer auf Umbra-Hintergrund (#3A2D28)
```

---

## 🛠 Storybook Build testen

```bash
npm run build-storybook
```

Kompiliert das gesamte Storybook in unter 1 Sekunde für schnelles Prototyping.

# ☕ NightCaffe POS — Frontend Template

A beautiful, mobile-first Point of Sale (POS) system template for cafés and restaurants. Built with **HTML**, **Tailwind CSS**, and **vanilla JavaScript** — ready to customize and integrate with any backend.

---

## 📸 Screens

| Screen | File | Description |
|--------|------|-------------|
| 🔐 Login | `index.html` | PIN/password login with Touch ID option |
| ⏳ Loading | `loading.html` | Animated splash screen with coffee cup |
| 🍽️ Menu | `menu.html` | Product grid, categories, search, cart bar |
| 🛒 Order Summary | `order-summary.html` | Cart items with qty controls, totals |
| 💳 Payment | `payment.html` | Cash/Card/QRIS, keypad, quick amounts |
| 📋 Order History | `order-history.html` | Orders list with status filters |
| 📊 Analytics | `analytics.html` | KPIs, charts, top products |
| 🚫 404 | `404.html` | "Coffee break" error page |

---

## 🛠️ Tech Stack

- **HTML5** — semantic, accessible markup
- **Tailwind CSS** (CDN) — utility-first styling
- **Vanilla JavaScript** — no framework dependencies
- **Google Fonts** — Plus Jakarta Sans
- **Material Symbols** — icon system

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/AdiYohanes/Front-End-Project.git

# Navigate to the POS template
cd Front-End-Project/nightcaffee-pos

# Open in browser
open index.html
```

No build step required! Just open `index.html` in your browser.

---

## 📁 Project Structure

```
nightcaffee-pos/
├── index.html            # Login page (entry point)
├── loading.html          # Splash/loading screen
├── menu.html             # Menu dashboard (main POS)
├── order-summary.html    # Cart / order summary
├── payment.html          # Payment checkout
├── order-history.html    # Order history
├── analytics.html        # Analytics dashboard
├── 404.html              # Error page
├── css/
│   └── styles.css        # Shared design system
├── js/
│   └── app.js            # Shared interactions
└── README.md             # This file
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| **Font** | Plus Jakarta Sans (400–800) |
| **Primary** | `#22C55E` (green) |
| **Background** | `#F8FAFC` (light) / `#0F172A` (dark) |
| **Border Radius** | 12px default, 24px cards |
| **Icons** | Material Symbols Outlined |

### Features
- ✅ Dark mode toggle (persisted)
- ✅ iOS-style mobile UI
- ✅ Smooth page transitions
- ✅ Interactive cart with qty controls
- ✅ Payment keypad with auto-change calculation
- ✅ Category & status filter tabs
- ✅ Search filtering

---

## 🔧 Customization

### Change Brand Colors
Edit `tailwind.config` in any HTML file:
```js
colors: {
  primary: "#YOUR_COLOR",
  "background-light": "#YOUR_BG",
}
```

### Add Menu Items
Copy a product card in `menu.html` and update:
- Image `src`
- Item name in `<h4>`
- Price in `data-price` attribute
- Category in `data-item-category`

### Connect to Backend
Replace static data with API calls in `js/app.js`. All interactive elements use `data-*` attributes for easy targeting.

---

## 📄 License

MIT — free to use commercially and personally.

---

Made with ❤️ and ☕ by [Adi Yohanes](https://github.com/AdiYohanes)

# Pitambara Dudh Dairy Website

A modern, premium, fully responsive business website built for **Pitambara Dudh Dairy**. Featuring a clean, traditional Indian dairy aesthetic, glassmorphism cards, auto-sliding testimonials, custom lightbox gallery, interactive timeline, and animated Scroll-Triggers using GSAP.

---

## Folder Structure

```
Pitambara-Dudh-Dairy/
│
├── index.html          # Landing Page
├── about.html          # Our Story & Founders Page
├── products.html       # Products Catalogue Page
├── gallery.html        # Photo Grid with Lightbox Page
├── contact.html        # Map & Form Inquiry Page
│
├── css/
│   ├── style.css       # Core Style & Design System Tokens
│   ├── responsive.css  # Mobile/Tablet Adaptations
│   └── animations.css  # CSS keyframe floaters & loaders
│
├── js/
│   ├── app.js          # Navigation, Modals, testimoals, WA buy redirects
│   ├── gsap.js         # GSAP ScrollTriggers & counter animations
│   ├── firebase.js     # Form capture linked to Realtime Database/LocalStorage
│   └── gallery.js      # Lightbox & Category Masonry filtering
│
└── assets/             # Photography assets
    ├── images/         # Hero backgrounds & core pictures
    ├── owners/         # Founder portraits
    ├── dairy/          # Dairy farm, collection, plant photos
    ├── gallery/        # High-res gallery media
    └── products/       # Fresh catalog items
```

---

## Key Customizations

### 1. Contact Info & WhatsApp Ordering
All business phone numbers, WhatsApp redirection links, and email addresses are central to the script. To modify them, open `js/app.js` and change the config object at the top:

```javascript
const PitambaraConfig = {
    businessName: "Pitambara Dudh Dairy",
    owners: ["Vandana Purohit", "Deelip Purohit"],
    phone: "+919876543210",          // Replace with real contact number
    whatsapp: "+919876543210",       // Replace with real WhatsApp number
    email: "info@pitambaradudhdairy.com",
    address: "Pitambara Dudh Dairy, Main Market Road, Dabra (Gwalior), Madhya Pradesh, India"
};
```

*Note: In `index.html`, `about.html`, `products.html`, `gallery.html`, and `contact.html`, also locate the floating WhatsApp anchor links and update the phone number in the `href="https://wa.me/919876543210..."` query.*

### 2. Firebase Database Setup
By default, the contact form falls back to saving inputs directly to the browser's local storage (`localStorage`) so the form remains functional offline and during development.
To write to a live database:
1. Create a Firebase project at the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Realtime Database** (read/write rules configured for production).
3. Open `js/firebase.js` and replace the configuration placeholders:
```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "YOUR_DATABASE_URL"
};
```
The script will automatically detect the settings and route form messages directly to your Firebase database path (`/contact_messages`).

---

## Styling & Theme Tokens

- **Sky Blue** (`#38BDF8`) & **Milk Blue** (`#0077E6`): Simulates fresh milk, trust, and cleanliness.
- **Fresh Green** (`#10B981`): Reputed for biological freshness, green farm feed, and purity.
- **Golden Yellow** (`#FFC107`): Simulates luxury ghee grain structures and quality.
- **Dark Navy** (`#0F172A`): Modern slate color serving as readable typeface background contrast.
- **Base font**: `Poppins` (general paragraphs) and `Playfair Display` (headings).

---

## Local Development

Simply open `index.html` in any browser or run a simple local web server:
- Using Python: `python -m http.server 8000`
- Using Node.js: `npx live-server` or `npm install -g serve && serve .`
- Using VSCode extension: Click "Go Live" in Live Server.

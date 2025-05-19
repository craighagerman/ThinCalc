Below is a proposed high‑level architecture for **ThinCalc**, built with Eleventy (11ty), Vite, Tailwind CSS, and Alpine.js. Everything is in markdown; feel free to adapt naming or conventions as you like.

---

## 📂 Project Structure

```
thin‑calc/
├── .eleventy.js
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── content/
│   │   └── index.md
│   ├── layouts/
│   │   └── base.njk
│   ├── assets/
│   │   ├── css/
│   │   │   └── main.css
│   │   └── js/
│   │       └── thincalc.js
│   └── partials/
│       ├── header.njk
│       └── footer.njk
├── public/
│   └── _redirects       # for Netlify deploys, etc.
└── dist/                # output (after build)
```

---

## 🔧 Configuration Files

* **`package.json`**
  Declares dependencies & scripts (build, watch, serve).

* **`vite.config.js`**
  Configures Vite dev server, build inputs, asset handling for Eleventy.

* **`tailwind.config.js`** & **`postcss.config.js`**
  Configure Tailwind’s purging, custom theme tokens, and PostCSS pipeline.

* **`.eleventy.js`**
  Tells Eleventy where to find `src/`, which file types to process, and passes through static assets from `public/` to `dist/`.

---

## 📄 Content & Layouts

* **`src/content/index.md`**
  The main page’s Markdown frontmatter and placeholder for our calculator component.

  ```markdown
  ---
  title: ThinCalc
  layout: base.njk
  ---
  <div id="thincalc" x-data="thincalc()" x-init="init()">
    <!-- Calculator UI inserted here -->
  </div>
  ```

* **`src/layouts/base.njk`**
  Overall HTML shell: imports Tailwind CSS, Vite‑built JS, and includes header/footer partials.

---

## 🛠️ Assets & Interactivity

### Tailwind CSS

* **`src/assets/css/main.css`**

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```
* Purged via `tailwind.config.js` against all `src/**/*.njk`, `src/**/*.md`, `src/**/*.js`.

### Alpine.js + Application Logic

* **`src/assets/js/thincalc.js`**
  Defines the Alpine component `thincalc()`:

  ```js
  function thincalc() {
    return {
      // state
      mortarOptions: ['All-Set', 'Fast-Set'],
      trowelOptions: ['½”', 'Ditra'],
      substrateOptions: ['Kerdi', 'Ditra'],
      selected: { mortar: null, trowel: null, substrate: null },
      units: {
        area: 'ft2',
        powder: 'lbs',
        water: 'qts'
      },
      values: { area: null, powder: null, water: null },

      // initialize watchers
      init() {
        this.$watch('values.area', v => this.computeFrom('area'));
        this.$watch('values.powder', v => this.computeFrom('powder'));
        this.$watch('values.water', v => this.computeFrom('water'));
      },

      // computation using: 1 mortar + 0.26 water = 0.72 area
      computeFrom(changed) {
        if (![this.values.area, this.values.powder, this.values.water].includes(null)) {
          const a = () => parseFloat(this.values.area);
          const m = () => parseFloat(this.values.powder);
          const w = () => parseFloat(this.values.water);

          if (changed === 'area') {
            const area = a();
            const mortar = (area / 0.72).toFixed(2);
            const water  = (mortar * 0.26).toFixed(2);
            this.values.powder = mortar;
            this.values.water  = water;
          }
          else if (changed === 'powder') {
            const mortar = m();
            const area   = (mortar * 0.72).toFixed(2);
            const water  = (mortar * 0.26).toFixed(2);
            this.values.area  = area;
            this.values.water = water;
          }
          else if (changed === 'water') {
            const water  = w();
            const mortar = (water / 0.26).toFixed(2);
            const area   = (mortar * 0.72).toFixed(2);
            this.values.powder = mortar;
            this.values.area   = area;
          }
        }
      }
    }
  }
  ```
* **Where state lives**: all in the Alpine component (`selected`, `units`, `values`). No external store needed.

---

## 🚀 Build & Dev Workflow

1. **Development**

   ```bash
   npm run dev
   ```

   * Vite serves assets with HMR (JS/CSS).
   * Eleventy watches `.md`/`.njk` content and regenerates `dist/`.

2. **Production Build**

   ```bash
   npm run build
   ```

   * Vite bundles/minifies JS/CSS into `dist/_assets`.
   * Eleventy renders static HTML to `dist/`.

3. **Deploy**
   Push `dist/` to any static‑host (Netlify, Vercel, GitHub Pages).

---

## 🔗 How Services Connect

* **Eleventy** reads your Markdown & Nunjucks templates in `src/`, outputs a flat HTML structure in `dist/`.
* **Vite** builds and serves the JS/CSS assets that Eleventy injects (referenced in base layout).
* **Tailwind** provides utility classes in your templates.
* **Alpine.js** binds to the `<div id="thincalc">` element at runtime, **hydrating** the calculator UI and managing reactivity.

---

### Summary

1. **File/folder layout** keeps content, layout, assets, and config distinct.
2. **State** (selected options, measurement values, units) lives entirely in the Alpine component defined in `thincalc.js`.
3. **Build tools** (Eleventy + Vite) operate in tandem: Eleventy for HTML, Vite for asset bundling & dev server.
4. **Tailwind** and **Alpine** handle UI styling & interactivity with zero runtime dependencies beyond a tiny Alpine footprint.

With this architecture, ThinCalc remains lightweight, fully static, and extremely easy to maintain or extend.

Below is a **task breakdown** for the ThinCalc MVP. Each item is an atomic, testable step with a clear start and end. Your engineering LLM can pick one at a time, implement it, and signal completion before moving on.

---

## ⚙️ 1. Project Bootstrap

1. **Initialize Git repo**

   * **Start:** Empty folder
   * **End:** `.git/` exists, initial commit made

2. **Create `package.json`**

   * **Start:** `npm init --yes`
   * **End:** `package.json` present with name, version, scripts placeholders

3. **Install dev dependencies**

   * **Start:** nothing installed
   * **End:** `node_modules/` contains eleventy, vite, tailwindcss, postcss, autoprefixer, alpinejs

   ```bash
   npm install --save-dev @11ty/eleventy vite tailwindcss postcss autoprefixer alpinejs
   ```

---

## 🛠️ 2. Tooling Configuration

4. **Create `tailwind.config.js`**

   * **Start:** file missing
   * **End:** file exists with `content: ["src/**/*.{njk,md,js}"]`

5. **Create `postcss.config.js`**

   * **Start:** file missing
   * **End:** file exists exporting `plugins: [ require('tailwindcss'), require('autoprefixer') ]`

6. **Create `vite.config.js`**

   * **Start:** file missing
   * **End:** file exports input pointing to Eleventy’s build directory and enables HMR of `src/assets`

7. **Create `.eleventy.js`**

   * **Start:** file missing
   * **End:** file configures Eleventy to read from `src/`, write to `dist/`, and passthrough `public/`

---

## 🗂️ 3. Folder & File Structure

8. **Make folders**

   * **Start:** empty project
   * **End:** directories `src/{content,layouts,partials,assets/css,assets/js}`, plus `public/`, `dist/`

9. **Create base placeholder files**

   * **Start:** folders empty
   * **End:** empty files:

     * `src/content/index.md`
     * `src/layouts/base.njk`
     * `src/partials/header.njk`
     * `src/partials/footer.njk`
     * `src/assets/css/main.css`
     * `src/assets/js/thincalc.js`

---

## 📄 4. Layout & Content

10. **Implement `base.njk` shell**

    * **Start:** blank file
    * **End:** `<html>…<head>` loads `main.css`, `<body>` includes `{{ content }}` and `<script>` for Alpine/Vite

11. **Add header & footer partials**

    * **Start:** blank partials
    * **End:** minimal `<header>` & `<footer>` markup, and base.njk includes `{% include 'header.njk' %}` etc.

12. **Write Markdown frontmatter in `index.md`**

    * **Start:** empty file
    * **End:** frontmatter with `title: ThinCalc` and `<div id="thincalc" x-data="thincalc()" x-init="init()">…</div>` placeholder

---

## 🎨 5. Tailwind CSS Setup

13. **Populate `main.css`**

    * **Start:** blank file
    * **End:**

      ```css
      @tailwind base;
      @tailwind components;
      @tailwind utilities;
      ```

14. **Verify Tailwind build**

    * **Start:** dev server off
    * **End:** on `npm run dev`, inspecting page shows Tailwind defaults (e.g. `.bg-blue-500` works)

---

## 📝 6. Alpine.js Component

15. **Scaffold `thincalc.js` module**

    * **Start:** blank JS file
    * **End:**

      ```js
      function thincalc() { return {} }
      window.thincalc = thincalc;
      ```

16. **Wire up to HTML**

    * **Start:** no `<script>` in base.njk
    * **End:** base.njk includes `<script type="module" src="/assets/js/thincalc.js"></script>` and Alpine.js import

17. **Define state variables**

    * **Start:** empty object in `thincalc()`
    * **End:** `selected`, `units`, `values`, and option arrays defined

18. **Implement watchers in `init()`**

    * **Start:** no watchers
    * **End:** `$watch` for `values.area`, `values.powder`, `values.water` calling `computeFrom()`

19. **Write `computeFrom()` logic**

    * **Start:** empty stub
    * **End:** handles three cases (“area”, “powder”, “water”) with correct formula and updates other values

---

## 🖥️ 7. UI & Interactivity

20. **Build dropdowns HTML**

    * **Start:** placeholder `<div>` only
    * **End:** three `<select>` elements bound to `selected.mortar`, `selected.trowel`, `selected.substrate` via `x-model`

21. **Add measurement toggles**

    * **Start:** no unit selects
    * **End:** each text input has adjacent `<select>` for unit, bound to `units.area|powder|water`

22. **Disable inputs until selections made**

    * **Start:** inputs always enabled
    * **End:** use `:disabled="!selected.mortar || !selected.trowel || !selected.substrate"` on the values section

23. **Bind text inputs**

    * **Start:** plain inputs
    * **End:** `<input type="number" x-model.number="values.area">` (and powder, water)

24. **Test one-directional compute**

    * **Start:** no user input
    * **End:** enter area → powder & water update; repeat for other two

---

## ✔️ 8. Testing & Validation

25. **Write manual test plan**

    * **Start:** no tests documented
    * **End:** checklist:

      * Inputs disabled until all selects chosen
      * Formula correctness within tolerance
      * Unit toggles do not break compute

26. **Smoke test in browser**

    * **Start:** dev server running
    * **End:** all UI elements appear, no console errors, basic compute works

---

## 🚀 9. Build & Deploy Scripts

27. **Add NPM scripts**

    * **Start:** empty `"scripts"` in package.json
    * **End:**

      ```json
      "scripts": {
        "dev": "eleventy --serve & vite",
        "build": "eleventy && vite build",
        "start": "npm run dev"
      }
      ```

28. **Run production build**

    * **Start:** development state
    * **End:** `npm run build` outputs static site in `dist/`

29. **Deploy to static host**

    * **Start:** `dist/` local
    * **End:** site live on Netlify/Vercel/GitHub Pages

---

Each task here is self‑contained: implement, verify, commit, then move on. Good luck rolling out ThinCalc!

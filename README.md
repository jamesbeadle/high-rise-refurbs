# High Rise Refurbishments Ltd

Draft marketing site for **High Rise Refurbishments Ltd** ("Securing Your Architectural Legacy"),
built with SvelteKit 2 + Svelte 5 + Tailwind CSS v3. Dark-luxury design system: navy `#0b1322`,
brand gold `#c9a44c`, Cormorant Garamond display + Inter body.
Deployed on Vercel (`@sveltejs/adapter-vercel`). No backend yet — Supabase can be added later.

## Stack

- **SvelteKit 2** / **Svelte 5** (runes)
- **Tailwind CSS v3** (config in `tailwind.config.js`)
- **Vercel adapter** for deployment
- JavaScript with JSDoc type-checking (`jsconfig.json`)

## Local development

```bash
npm install
npm run dev          # http://localhost:5173
```

Other scripts:

```bash
npm run build        # production build
npm run preview      # preview the production build locally
npm run check        # type / svelte checks
```

## Project structure

```
src/
  app.html            # page shell
  app.css             # Tailwind entry
  routes/
    +layout.svelte    # header / footer / nav
    +page.svelte      # homepage
    about/+page.svelte
    contact/+page.svelte
static/               # static assets (favicon, images)
tailwind.config.js    # theme: brand colors + Inter font
svelte.config.js      # Vercel adapter
```

## Editing content

- The four service arms (all copy for the /services pages): `src/lib/data/services.js`
- Header / footer / nav: `src/routes/+layout.svelte`
- Homepage: `src/routes/+page.svelte` · Heritage: `src/routes/about/+page.svelte` · Contact: `src/routes/contact/+page.svelte`
- Brand colours + fonts: `theme.extend` in `tailwind.config.js`; shared utilities (`.eyebrow`, `.btn-gold`, `.thread-v`) in `src/app.css`
- Logo assets: `static/logo-full.png`, `static/mark.png` (shield only), `static/favicon.png` — extracted from the brand deck
- Contact email/phone are drafts — search for "0000" and `enquiries@` before launch; the form opens a mail client until a backend is wired up

## Deploy to Vercel

1. Push this repo to GitHub (`high-rise-refurbs`).
2. In Vercel: **Add New → Project → Import** this repo.
3. Framework preset auto-detects as **SvelteKit**. No env vars needed yet.
4. Deploy. You'll get a `*.vercel.app` test URL immediately.
5. Point a custom domain later under **Project → Settings → Domains** (DNS can be configured then).

## Adding Supabase later

When these become dynamic, install `@supabase/ssr`, add the keys to `.env`
(see `.env.example`), and create a client in `src/lib`. Not wired up yet.

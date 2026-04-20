# hudsonreynolds.tech / .org

Personal portfolio site. Built with [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com).

Design inspired by `kaedinkurtz.com` — project-first, tag-driven, with a deep-ocean + forest palette ("blue and green like the earth").

---

## TL;DR

```bash
npm install
npm run dev        # local dev at http://localhost:4321
npm run build      # production build to ./dist
```

Push to GitHub → Cloudflare Pages auto-deploys.

---

## Editing the site

Everything you'll normally touch lives in **`src/config/`**. You should not need to edit any `.astro` files to update content.

### `src/config/site.ts`

- Your name, tagline, blurb
- Email, location
- Social links (leave any as `""` to hide the icon)
- Nav bar items
- **Theme colors** — the whole earth palette lives here. Tweak one hex value and the entire site re-themes.

### `src/config/projects.ts`

- The full list of projects.
- Each entry has a `slug`, `title`, `summary`, `tags`, `image`, optional `gallery`, optional `links`, and optional `sections` (long-form writeup).
- Set `featured: true` to make a project appear on the homepage grid. Others still appear on `/projects`.

**To add a new project:** copy an existing entry, change the fields, save. Astro rebuilds automatically.

**To reorder projects on the homepage:** reorder the entries in the `projects` array.

### `src/config/about.ts`

- Bio (paragraphs separated by blank lines)
- Education entries
- Publications
- Skills (grouped)

---

## Adding images

Images live in **`public/images/`** — they are served as-is from the site root. Reference them in configs with a path that starts with `/`.

### Directory layout

```
public/
├── favicon.svg
├── resume.pdf                     ← drop your resume here
└── images/
    ├── about/
    │   └── headshot.jpg           ← your about-page photo
    └── projects/
        ├── frostbyte-hero.jpg
        ├── frostbyte-rig.jpg
        ├── frostbyte-overlay.jpg
        ├── frostbyte-diagnostic.jpg
        ├── frostbyte-dashboard.jpg
        │
        ├── echoes-hero.jpg
        ├── echoes-architecture.jpg
        ├── echoes-listener.jpg
        ├── echoes-aggregator.jpg
        ├── echoes-deployment.jpg
        │
        ├── flexdc-hero.jpg
        ├── flexdc-architecture.jpg
        ├── flexdc-results.jpg
        │
        ├── me416-hero.jpg
        ├── me416-limo.jpg
        ├── me416-mocap.jpg
        ├── me416-maze.jpg
        ├── me416-path.jpg
        │
        ├── ec522-hero.jpg
        ├── ec522-psf.jpg
        ├── ec522-deconv.jpg
        ├── ec522-depth.jpg
        │
        ├── ec311-hero.jpg
        ├── esp-idf-spi-hero.jpg
        ├── pi-power-hero.jpg
        ├── webblink-hero.jpg
        ├── spotify-hero.jpg
        ├── esp32-ble-hero.jpg
        ├── sleep-tracker-hero.jpg
        ├── id-finder-hero.jpg
        └── shulker-hero.jpg
```

### Image sizing guide

| Slot             | Recommended dimensions | Notes |
|------------------|------------------------|-------|
| `*-hero.jpg`     | 1600 × 1000 (16:10)    | Card + detail-page hero |
| Gallery images   | 1400 × 1050 (4:3)      | Shown at ~480×360 in grid |
| About headshot   | 600 × 800 (3:4)        | Portrait orientation |

Images fail gracefully — missing files show a blue/green gradient instead of a broken icon, so it's safe to commit with placeholders and fill in later.

**Format tips:**
- Use `.jpg` for photos, `.png` or `.svg` for diagrams.
- Run things through [Squoosh](https://squoosh.app) before committing. Target < 300 KB per hero, < 150 KB per gallery image.

---

## Deploying to Cloudflare Pages

### One-time setup

1. **Push the repo to GitHub.**

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin git@github.com:HudsonReynolds2/hudsonreynolds.tech.git
   git push -u origin main
   ```

2. **Create the Cloudflare Pages project.**
   - Log in at [dash.cloudflare.com](https://dash.cloudflare.com).
   - Go to **Workers & Pages → Create → Pages → Connect to Git**.
   - Select your GitHub repo.
   - Build settings:
     - **Framework preset:** Astro
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
   - Save and deploy. Your site will be live at `<project-name>.pages.dev` in ~1 min.

3. **Attach custom domains.**
   - In the Pages project → **Custom domains → Set up a custom domain**.
   - Add `hudsonreynolds.tech`. Cloudflare will ask you to either:
     - Move the domain's nameservers to Cloudflare (easiest, free), or
     - Add a CNAME at your current registrar pointing to `<project>.pages.dev`.
   - Repeat for `hudsonreynolds.org` and for `www.hudsonreynolds.tech` / `.org`.
   - Cloudflare issues SSL certs automatically.

4. **Redirects (optional but recommended).**
   Pick one canonical domain (I'd suggest `.tech`) and 301-redirect the other to it. In the Cloudflare dashboard for the `.org` domain, create a single-redirect rule:
   - *If hostname matches* `hudsonreynolds.org`
   - *Then 301 to* `https://hudsonreynolds.tech/${path}`

### Every deploy after that

```bash
git add .
git commit -m "Update FrostByte gallery images"
git push
```

Cloudflare builds and deploys automatically. Previews are generated for every branch.

---

## Local development

```bash
npm install
npm run dev
```

Opens at `http://localhost:4321`. Hot reload works for all `.astro` files and all config files.

To test a production build locally:

```bash
npm run build
npm run preview
```

---

## Adding a resume PDF

Drop your resume at `public/resume.pdf`. The "Resume" nav link and footer link will pick it up automatically. No config edit needed.

If you want to use a different filename, edit `site.socials.resume` in `src/config/site.ts`.

---

## Tweaking the theme

The entire color palette is in `src/config/site.ts` under `theme`. The site uses CSS custom properties (CSS variables) so changing any hex value re-themes every page.

Current palette intent:

| Token            | Hex       | Used for |
|------------------|-----------|----------|
| `bg`             | `#0a1f2e` | Deep ocean — page background |
| `bgElevated`     | `#10293a` | Card backgrounds |
| `bgSubtle`       | `#0d2332` | Section banding |
| `text`           | `#e8f0e4` | Main text (warm atmospheric white) |
| `textMuted`      | `#9bb1ae` | Secondary text |
| `textFaint`      | `#5a7470` | Labels, metadata |
| `ocean`          | `#2d7fa3` | Primary blue accent |
| `oceanDeep`      | `#1a5578` | Hover / deep |
| `forest`         | `#4a8c5a` | Primary green |
| `forestBright`   | `#6bb37e` | Accent green (links, highlights) |
| `sand`           | `#d4b483` | Warm accent (unused by default) |

Want more saturation? Push `ocean` and `forest` brighter. Want a softer look? Lighten `bg` to `#0f2838`. Want night-sky instead of deep ocean? Shift `bg` to `#0b1a2a` and add a subtle purple to `ocean`. The palette in `site.ts` is the single source of truth.

---

## Adding a new page

1. Create `src/pages/<name>.astro`.
2. Copy the structure from `about.astro` or `projects/index.astro`.
3. To add it to the nav, add a `{ label, href }` entry to `site.nav` in `src/config/site.ts`.

---

## Credits

- Typography: [Fraunces](https://fonts.google.com/specimen/Fraunces), [Hanken Grotesk](https://fonts.google.com/specimen/Hanken+Grotesk), [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — all via Google Fonts.
- Framework: [Astro](https://astro.build)
- Hosting: [Cloudflare Pages](https://pages.cloudflare.com)

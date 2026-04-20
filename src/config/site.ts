// ============================================================================
// SITE CONFIG
// ----------------------------------------------------------------------------
// This is where you edit your identity, contact info, nav, and theme colors.
// All values here are consumed across every page. No code changes needed.
// ============================================================================

export const site = {
  // ── Identity ───────────────────────────────────────────────────────────────
  name: "Hudson Reynolds",
  tagline: "Computer Engineer",
  blurb:
    "Computer Engineering student at Boston University, graduating May 2026. " +
    "I build systems that bridge embedded hardware and distributed software — " +
    "from multi-sensor ice-detection platforms to autonomous bioacoustic " +
    "networks deployed in the field.",

  // ── Contact ────────────────────────────────────────────────────────────────
  email: "hudsonre@bu.edu",
  location: "Boston, MA → San Diego, CA",

  // ── Social links (leave any empty "" to hide that icon) ────────────────────
  socials: {
    github: "https://github.com/HudsonReynolds2",
    linkedin: "www.linkedin.com/in/hudson-m-reynolds",        // add your LinkedIn URL here
    scholar: "",         // Google Scholar if you have one
    resume: "/resume.pdf", // drop your resume PDF at /public/resume.pdf
  },

  // ── Navigation (in order) ──────────────────────────────────────────────────
  nav: [
    { label: "Home",     href: "/"         },
    { label: "About",    href: "/about"    },
    { label: "Projects", href: "/projects" },
    { label: "Resume",   href: "/resume.pdf", external: true },
  ],

  // ── Theme: blue + green like the earth ─────────────────────────────────────
  // These become CSS variables. Tweak freely; the rest of the site updates.
  // Inspired by earth-observation imagery: deep ocean, atmospheric haze,
  // chlorophyll, and bone-white atmosphere glow.
  theme: {
    // Backgrounds (deep ocean → atmospheric)
    bg:          "#0a1f2e",   // deep ocean, page background
    bgElevated:  "#10293a",   // card/panel background
    bgSubtle:    "#0d2332",   // subtle section banding

    // Text
    text:        "#e8f0e4",   // main text, faint green-white (like lit atmosphere)
    textMuted:   "#9bb1ae",   // secondary text
    textFaint:   "#5a7470",   // labels, meta

    // Accents
    ocean:       "#2d7fa3",   // primary blue (mid-ocean satellite)
    oceanDeep:   "#1a5578",   // hover/deep
    forest:      "#4a8c5a",   // primary green (forest canopy)
    forestBright:"#6bb37e",   // accent green (chlorophyll glow)

    // Supporting
    sand:        "#d4b483",   // warm accent (coastline / dune)
    border:      "#1e3a4a",   // subtle dividers
    borderBright:"#2d5268",   // brighter dividers on hover
  },
};

export type SiteConfig = typeof site;

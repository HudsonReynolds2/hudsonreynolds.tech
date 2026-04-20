import { defineConfig } from 'astro/config';

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // When deploying, both hudsonreynolds.tech and .org should point at this same build.
  // Cloudflare Pages handles multiple custom domains natively.
  site: 'https://hudsonreynolds.tech',

  adapter: cloudflare()
});
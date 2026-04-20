import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://hudsonreynolds.tech',
  // When deploying, both hudsonreynolds.tech and .org should point at this same build.
  // Cloudflare Pages handles multiple custom domains natively.
});

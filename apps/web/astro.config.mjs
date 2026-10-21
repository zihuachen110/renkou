import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  site: "https://renkou.pages.dev",
  integrations: [react(), tailwind({ applyBaseStyles: false })],
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    // MapLibre ships its own worker; Vite dep optimizer breaks it in dev.
    optimizeDeps: {
      exclude: ["maplibre-gl"],
    },
  },
});

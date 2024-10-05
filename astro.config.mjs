import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import AstroPWA from "@vite-pwa/astro";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    tailwind(),
    react(),
    AstroPWA({
      registerType: "autoUpdate",
      workbox: {
        runtimeCaching: [
          {
            handler: "StaleWhileRevalidate",
            options: {
              cacheableResponse: {
                statuses: [0, 200],
              },
              cacheName: "http-cache",
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
              },
            },
            urlPattern: ({ url }) => {
              const { protocol } = new URL(url);

              return "http:" === protocol || "https:" === protocol;
            },
          },
        ],
      },
    }),
  ],
  output: "hybrid",
});

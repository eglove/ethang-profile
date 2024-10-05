import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { VitePWA } from "vite-plugin-pwa";

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
    VitePWA({
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

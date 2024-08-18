import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

const isProduction = "production" === import.meta.env.MODE;

// https://astro.build/config
export default defineConfig({
  adapter: isProduction
    ? undefined
    : cloudflare({
      platformProxy: {
        enabled: true,
      },
    }),
  integrations: [tailwind(), react()],
  output: isProduction
    ? "static"
    : "server",
});

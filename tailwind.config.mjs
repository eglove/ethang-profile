// eslint-disable-next-line barrel/avoid-barrel-files
import { nextui } from "@nextui-org/react";
import prose from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  plugins: [nextui(), prose],
  safelist: [
    {
      pattern: /^text-cyan-\d{3}$/u,
    },
    {
      pattern: /^text-teal-\d{3}$/u,
    },
    {
      pattern: /^text-green-\d{3}$/u,
    },
  ],
  theme: {
    extend: {
      rotate: {
        135: "135deg",
      },
    },
  },
};

import { content as _content, plugin } from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */

export const content = [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
  _content(),
];
export const theme = {
  extend: {
    colors: {
      "primary": "#1d4ed8"
    }
  },
};
export const plugins = [
  plugin(),
];
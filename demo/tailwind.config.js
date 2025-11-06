/** @type {import('tailwindcss').Config} */
const rootConfig = require('../tailwind.config.js');

module.exports = {
  ...rootConfig,
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    '../src/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
};

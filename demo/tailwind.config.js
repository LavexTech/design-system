/** @type {import('tailwindcss').Config} */
module.exports = {
  ...require('../tailwind.config.js'),
  content: [
    './app/**/*.{html,js,jsx,ts,tsx,mdx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    '../src/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
};

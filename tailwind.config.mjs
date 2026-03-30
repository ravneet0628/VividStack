/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'vivid-navy': '#253644',
        'vivid-teal': '#5DFFEC',
        'vivid-mint': '#95CBD0',
        'vivid-cream': '#F8F9FA',
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
      },
      transitionTimingFunction: {
        architectural: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

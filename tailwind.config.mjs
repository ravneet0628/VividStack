/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      keyframes: {
        swipe: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(6px)' },
        },
      },
      animation: {
        swipe: 'swipe 1.2s ease-in-out infinite',
      },
      colors: {
        'vivid-navy': '#253644',
        'vivid-navy-dark': '#1a2834',
        'vivid-teal': '#5DFFEC',
        'vivid-mint': '#95CBD0',
        'vivid-cream': '#F8F9FA',
        /** Section panels — matches `.impeccable.md` allowed neutrals */
        'vivid-panel': '#f3f3f4',
        /** High-energy accent — neon mint */
        'neon-mint': '#00ffcc',
        /** Small-card title emphasis — deepened navy */
        'vivid-navy-deep': '#1e2d38',
        'vivid-navy-muted': '#3d5664',
      },
      fontFamily: {
        sans: ['"Montserrat"', 'sans-serif'],
      },
      transitionTimingFunction: {
        architectural: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        brutalist: '8px 8px 0 0 rgb(0, 0, 0)',
        'brutalist-lg': '12px 12px 0 0 rgb(0, 0, 0)',
        'brutalist-neon': '8px 8px 0 0 #00ffcc',
        'brutalist-neon-lg': '12px 12px 0 0 #00ffcc',
        'brutalist-sm': '4px 4px 0 0 rgb(0, 0, 0)',
        'brutalist-neon-sm': '4px 4px 0 0 #00ffcc',
        'brutalist-white-sm': '4px 4px 0 0 #ffffff',
        'brutalist-white': '6px 6px 0 0 #ffffff',
        'brutalist-navy-sm': '4px 4px 0 0 rgb(37, 54, 68)',
        'brutalist-navy-md': '6px 6px 0 0 rgb(37, 54, 68)',
        'brutalist-navy-lg': '10px 10px 0 0 rgb(37, 54, 68)',
        'brutalist-navy-xl': '8px 8px 0 0 rgb(37, 54, 68)',
        'brutalist-navy-2xs': '1px 1px 0 0 rgb(37, 54, 68)',
        'brutalist-navy-chip': '3px 3px 0 0 rgb(37, 54, 68)',
        'brutalist-mint-md': '6px 6px 0 0 rgb(149, 203, 208)',
        'brutalist-mint-lg': '12px 12px 0 0 rgb(149, 203, 208)',
        'brutalist-mint-sm': '3px 3px 0 0 rgb(149, 203, 208)',
        'brutalist-hero': '6px 6px 0 0 rgb(0, 0, 0)',
        'brutalist-hero-lg': '10px 10px 0 0 rgb(0, 0, 0)',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        salbei: '#A3B18A',
        leinen: '#EFE7DF', 
        rose: '#F5D8C8',
        tau: '#E9EFE9',
        ton: '#C8A691',
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
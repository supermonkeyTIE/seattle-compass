import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-lora)', 'Georgia', 'serif'],
        body: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#fefcf7',
          100: '#fdf8ec',
          200: '#f8edce',
        },
        terra: {
          100: '#fde8df',
          200: '#f9c9b4',
          400: '#e07048',
          500: '#c84d25',
          600: '#a83e1d',
          700: '#8a3118',
          800: '#6b2614',
        },
        forest: {
          100: '#dff0cc',
          400: '#6aab3e',
          600: '#3d7324',
          700: '#2d5a1b',
          800: '#1e3c10',
          900: '#132608',
        },
        warm: {
          50: '#faf7f2',
          100: '#f4ede0',
          200: '#e8d9c0',
          600: '#8c6e4b',
          700: '#6e5338',
          800: '#4a3420',
          900: '#2e1f0e',
        },
      },
    },
  },
  plugins: [],
}
export default config

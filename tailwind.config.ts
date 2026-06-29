import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        emc: {
          primary: '#1a56db',
          secondary: '#0e9f6e',
          warning: '#e3a008',
          danger: '#e02424',
          dark: '#111928',
        }
      }
    },
  },
  plugins: [],
}
export default config

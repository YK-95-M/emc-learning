import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        pcb: {
          primary: '#0d9488',
          secondary: '#3b82f6',
          warning: '#e3a008',
          danger: '#e02424',
          dark: '#111928',
        },
        emc: {
          primary: '#1a56db',
        }
      }
    },
  },
  plugins: [],
}
export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#17212B',
          dark: '#0E151C',
          light: '#243242',
        },
        warm: {
          DEFAULT: '#F7F5F0',
          50: '#FCFBF9',
          100: '#F7F5F0',
          200: '#EFECE4',
          300: '#E4DFD5',
          400: '#D2CBBF',
        },
        sage: {
          DEFAULT: '#5E806B',
          dark: '#4B6756',
          light: '#769A84',
          subtle: '#E8EFEA',
        },
        terracotta: {
          DEFAULT: '#C8755A',
          dark: '#A85F48',
          light: '#DC8E75',
          subtle: '#F9EEEA',
        },
        dusty: {
          DEFAULT: '#7896A8',
          dark: '#5F798A',
          light: '#93AEBD',
          subtle: '#EDF2F5',
        },
        amber: {
          DEFAULT: '#C79A52',
          dark: '#A8803F',
          subtle: '#FAF4E8',
        },
        mutedRed: {
          DEFAULT: '#B85C5C',
          dark: '#9A4A4A',
          subtle: '#F8ECEC',
        },
        charcoal: {
          DEFAULT: '#25282B',
          muted: '#5A6065',
          light: '#8B939A',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(23, 33, 43, 0.05), 0 1px 2px rgba(23, 33, 43, 0.03)',
        'card': '0 4px 12px rgba(23, 33, 43, 0.04), 0 1px 3px rgba(23, 33, 43, 0.03)',
        'elevated': '0 10px 25px rgba(23, 33, 43, 0.06), 0 4px 10px rgba(23, 33, 43, 0.03)',
      },
    },
  },
  plugins: [],
}

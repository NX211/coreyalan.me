/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/styles/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#485564',
          dark: '#2d3748',
          light: '#64748b',
        },
        accent: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
          light: '#fb923c',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            a: {
              color: '#485564',
              '&:hover': {
                color: '#2d3748',
              },
            },
            h1: {
              fontWeight: '800',
            },
            h2: {
              fontWeight: '700',
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: '#f97316',
              backgroundColor: '#f3f4f6',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              padding: '1em',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            blockquote: {
              borderLeftColor: '#f97316',
              fontStyle: 'normal',
            },
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 
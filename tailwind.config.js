/*
 *   Copyright (c) 2025 
 *   All rights reserved.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0a1e4b',
        navy900: '#081c44',
        brandBlue: '#39b6f0',
        brandPink: '#e61f78',
      },
      skew: { '31': '31deg' },
    },
  },
  plugins: [],
}



import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'blob-spin': 'blobSpin 25s infinite linear',
        'blob-reverse': 'blobReverse 30s infinite linear',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scanning 2s infinite ease-in-out',
        'spin-slow': 'spin 12s infinite linear',
      },
      keyframes: {
        blobSpin: {
          '0%': { transform: 'translate(0px, 0px) scale(1) rotate(0deg)' },
          '33%': { transform: 'translate(100px, -80px) scale(1.2) rotate(120deg)' },
          '66%': { transform: 'translate(-80px, 120px) scale(0.8) rotate(240deg)' },
          '100%': { transform: 'translate(0px, 0px) scale(1) rotate(360deg)' },
        },
        blobReverse: {
          '0%': { transform: 'translate(0px, 0px) scale(1.1) rotate(360deg)' },
          '50%': { transform: 'translate(-120px, 60px) scale(0.9) rotate(180deg)' },
          '100%': { transform: 'translate(0px, 0px) scale(1.1) rotate(0deg)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
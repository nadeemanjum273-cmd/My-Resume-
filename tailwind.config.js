/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          950: "#030407",
          900: "#06070a",
          850: "#0b0d13",
          800: "#111420",
          750: "#151929",
          700: "#1a1f30",
        },
        cyanGlow: "#00f2fe",
        purpleGlow: "#8b5cf6",
        emeraldGlow: "#10b981",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "sans-serif"],
        display: ["Space Grotesk", "Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 242, 254, 0.45)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.45)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

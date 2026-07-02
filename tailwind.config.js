/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Brand palette pulled from the Yanova Solutions logo
        brand: {
          DEFAULT: '#1a6fc4', // primary blue "YS"
          dark: '#0d3f7a',
          deep: '#050c1a', // near-black navy background
          navy: '#071a33',
          light: '#3aa0e3',
          cyan: '#37c3e8', // accent cyan (keyhole / "SOLUTIONS")
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      backgroundImage: {
        'radial-fade': 'radial-gradient(ellipse at top, rgba(26,111,196,0.18), transparent 60%)',
        'brand-gradient': 'linear-gradient(135deg, #37c3e8 0%, #1a6fc4 50%, #0d3f7a 100%)',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(55,195,232,0.45)',
        'glow-lg': '0 0 80px -12px rgba(26,111,196,0.5)',
        card: '0 20px 60px -20px rgba(0,0,0,0.6)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%,100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'scan': {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease-out both',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 4s ease-in-out infinite',
        marquee: 'marquee 40s linear infinite',
        shimmer: 'shimmer 3s linear infinite',
        'pulse-ring': 'pulse-ring 3s ease-out infinite',
        scan: 'scan 3.5s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};

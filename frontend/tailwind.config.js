/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2563EB',
          dark: '#1E40AF',
          teal: '#0F766E',
          cyan: '#06B6D4',
          bg: '#EFF6FF',
          text: '#0F172A',
          muted: '#64748B',
          white: '#FFFFFF',
          error: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-ring': 'pulseRing 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'pulse-ring-delayed': 'pulseRing 2.5s cubic-bezier(0.215, 0.61, 0.355, 1) 1.25s infinite',
        'hero-entrance': 'heroEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'hero-entrance-delayed': 'heroEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.35s forwards',
        'orbit-rotate': 'orbitRotate 14s linear infinite',
        'orbit-counter': 'orbitCounter 14s linear infinite',
        'heartbeat-pulse': 'heartbeatPulse 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'capsule-tilt-float': 'capsuleTiltFloat 4.5s ease-in-out infinite',
        'shimmer-sweep': 'shimmerSweep 3s ease-in-out infinite',
      },
      keyframes: {
        pulseRing: {
          '0%': { transform: 'scale(0.6)', opacity: '0.9', boxShadow: '0 0 0 0 rgba(6, 182, 212, 0.5)' },
          '70%': { opacity: '0.3' },
          '100%': { transform: 'scale(2.2)', opacity: '0', boxShadow: '0 0 30px 10px rgba(6, 182, 212, 0)' },
        },
        heroEntrance: {
          '0%': { opacity: '0', transform: 'translateY(24px) scale(0.94)', filter: 'blur(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)', filter: 'blur(0px)' },
        },
        orbitRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        orbitCounter: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(-360deg)' },
        },
        heartbeatPulse: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 8px rgba(37, 99, 235, 0.3))' },
          '14%': { transform: 'scale(1.09)', filter: 'drop-shadow(0 0 20px rgba(37, 99, 235, 0.6))' },
          '28%': { transform: 'scale(1.02)', filter: 'drop-shadow(0 0 10px rgba(37, 99, 235, 0.35))' },
          '42%': { transform: 'scale(1.14)', filter: 'drop-shadow(0 0 26px rgba(6, 182, 212, 0.7))' },
          '70%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 8px rgba(37, 99, 235, 0.3))' },
        },
        capsuleTiltFloat: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-2deg) rotateX(4deg)', filter: 'drop-shadow(0 15px 25px rgba(37,99,235,0.12))' },
          '50%': { transform: 'translateY(-16px) rotate(3deg) rotateX(-4deg)', filter: 'drop-shadow(0 25px 35px rgba(37,99,235,0.22))' },
        },
        shimmerSweep: {
          '0%': { transform: 'translateX(-120%)' },
          '20%, 100%': { transform: 'translateX(120%)' },
        }
      }
    },
  },
  plugins: [],
}

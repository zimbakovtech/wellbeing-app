/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Neutral editorial scale - warm off-white paper to charcoal ink
        paper: '#FAFAF7',
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#1B1E24', // primary text - charcoal
          soft: '#3D424C',
          muted: '#6A707C', // secondary text
          faint: '#9AA0AB',
        },
        line: {
          DEFAULT: '#ECEAE4', // hairline borders
          strong: '#DEDCD4',
        },
        // Muted slate-blue primary
        blue: {
          50: '#F2F6FB',
          100: '#E3ECF6',
          200: '#C6D7EA',
          300: '#9FBAD8',
          400: '#7298C2',
          500: '#4F79AC', // primary
          600: '#3F6492',
          700: '#345377',
          800: '#2E4661',
          900: '#293B52',
        },
        // Calm, desaturated topic accents (also used for chart series)
        topic: {
          sleep: '#6C7BB3',
          stress: '#C58A6A',
          activity: '#6E9E84',
          loneliness: '#9080AE',
          digital: '#5C92A0',
          school: '#5E83B3',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(27,30,36,0.04), 0 4px 16px rgba(27,30,36,0.05)',
        lift: '0 2px 4px rgba(27,30,36,0.05), 0 12px 32px rgba(27,30,36,0.08)',
        ring: '0 0 0 1px rgba(27,30,36,0.04)',
      },
      maxWidth: {
        content: '76rem',
        prose: '42rem',
      },
      transitionTimingFunction: {
        gentle: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}

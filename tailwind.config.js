module.exports = {
  content: [
    './apps/squaredash-web/pages/**/*.{js,ts,jsx,tsx}',
    './apps/squaredash-web/components/**/*.{js,ts,jsx,tsx}',
    './libs/web/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tailwind-datepicker-react/dist/**/*.js',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  presets: [require('./tailwind-workspace-preset.js')],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screens: {
      xs: {
        max: '400px',
      },
      sm: {
        max: '700px',
      },
      md: {
        min: '701px',
        max: '1040px',
      },
      lg: {
        min: '1041px',
        max: '1440px',
      },
      xl: {
        min: '1441px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwindcss-children'),
  ],
};

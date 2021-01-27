module.exports = {
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'media',
    theme: {
      extend: {
        screens: {
          'dark-mode': {'raw': '(prefers-color-scheme: dark)'},
        }
      }
    },
    variants: {
      extend: {},
    },
    plugins: [],
}
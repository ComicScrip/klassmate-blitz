// tailwind.config.js
module.exports = {
  purge: ["{app,pages}/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionProperty: {
        height: "height",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["odd"],
    },
  },
  plugins: [],
}

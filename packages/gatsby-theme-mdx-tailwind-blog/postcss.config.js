const tailwindcss = require('tailwindcss');

module.exports = () => ({
  plugins: [
    tailwindcss(`${__dirname}/tailwind.config.js`),
    require('autoprefixer'),
  ],
});

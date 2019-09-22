const tailwindcss = require('tailwindcss');
const path = require('path');

module.exports = ({
  tailwind: { configPath = `${__dirname}/tailwind.config.js` } = {},
  purgeCSS: {
    purgeOnly = [path.join(__dirname, 'src/css/tailwind.css')],
    content = [],
  } = {},
}) => ({
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [tailwindcss(configPath), require('autoprefixer')],
      },
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly,
        content: [
          path.join(__dirname, 'src/**/!(*.d).{ts,js,jsx,tsx}'),
          path.join(process.cwd(), 'src/**/!(*.d).{ts,js,jsx,tsx}'),
          ...content,
        ],
      },
    },
  ],
});

const path = require('path');

module.exports = ({
  purgeCSS: {
    purgeOnly = [path.join(__dirname, 'src/css/tailwind.css')],
    content = [],
  } = {},
}) => ({
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        config: {
          path: `${__dirname}/postcss.config.js`,
        },
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

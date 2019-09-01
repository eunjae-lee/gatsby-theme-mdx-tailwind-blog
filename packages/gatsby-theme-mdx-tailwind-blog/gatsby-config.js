module.exports = {
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
        purgeOnly: [`src/css/style.css`],
      },
    },
  ],
};

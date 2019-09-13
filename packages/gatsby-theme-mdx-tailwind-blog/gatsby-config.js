module.exports = ({ purgecss }) => ({
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        config: {
          path: `${__dirname}/postcss.config.js`,
        },
      },
    },
    purgecss === null
      ? null
      : {
          resolve: `gatsby-plugin-purgecss`,
          options: Object.assign(
            {
              tailwind: true,
              purgeOnly: [`src/css/style.css`],
            },
            purgecss
          ),
        },
  ].filter(Boolean),
});

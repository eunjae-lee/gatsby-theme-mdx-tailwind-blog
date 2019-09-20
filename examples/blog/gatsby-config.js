const path = require('path');

module.exports = {
  siteMetadata: {
    title: `eunjae.dev`,
    author: `Eunjae Lee`,
    description: `Software Engineer @ Algolia`,
  },
  plugins: [
    `gatsby-theme-mdx-blog`,
    `gatsby-theme-mdx-tailwind-blog`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};

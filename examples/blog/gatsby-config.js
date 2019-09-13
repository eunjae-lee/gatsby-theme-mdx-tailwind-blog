module.exports = {
  siteMetadata: {
    title: `Tailwind CSS example`,
    author: `Eunjae Lee`,
    description: `This is an example with Tailwind CSS.`,
  },
  plugins: [
    `gatsby-theme-mdx-blog`,
    { resolve: `gatsby-theme-mdx-tailwind-blog`, options: null },
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

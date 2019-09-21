# gatsby-theme-mdx-tailwind-blog

## Installation

This theme is based on [gatsby-theme-mdx-blog](https://github.com/eunjae-lee/gatsby-theme-mdx-blog).

So you need to install both `gatsby-theme-mdx-blog` and `gatsby-theme-mdx-tailwind-blog`.

```bash
yarn add gatsby-theme-mdx-blog gatsby-theme-mdx-tailwind-blog
```

## How to use

### Configuration

In your `gatsby-config.js` file,

module.exports = {
  siteMetadata: {
    title: `Your Title`,
    author: `Your Name`,
    description: `Your Description`,
  },
  plugins: [
    `gatsby-theme-mdx-blog`,
    `gatsby-theme-mdx-tailwind-blog`,
  ],
};

### Adding posts

Add your posts under

`src/pages/your-post.mdx`

or

`src/pages/your-post/index.mdx`

### `/about` page

This theme has a link to `/about` page in the header.

If you're going to use the theme without modification, then you need to create `about.mdx` or `about.js` file. It's in the example.

### Syntax Highlighting

You can highlight code syntax.

First, install themes like the following:

```bash
yarn add prism-themes
```

Then, create `gatsby-browser.js` like this:

```js
import 'prism-themes/themes/prism-darcula.css';
```

That's it.

## Run the example

```bash
yarn install && yarn example
```

All the source code is under `examples/blog`.

You can also see the live demo [here →](https://gatsby-theme-mdx-tailwind-blog.netlify.com).
module.exports = {
  filesToBump: [
    'package.json',
    'packages/gatsby-theme-mdx-blog/package.json',
    'packages/gatsby-theme-mdx-tailwind-blog/package.json',
  ],
  publishCommand: ({ defaultCommand }) =>
    `(cd packages/gatsby-theme-mdx-blog && ${defaultCommand}) && (cd packages/gatsby-theme-mdx-tailwind-blog && ${defaultCommand})`,
  versionUpdated: ({ version, dir, exec }) => {
    exec(
      `npx json -I -f examples/blog/package.json -e 'this.dependencies["gatsby-theme-mdx-blog"] = "${version}"'`
    );
    exec(
      `npx json -I -f examples/tailwind/package.json -e 'this.dependencies["gatsby-theme-mdx-tailwind-blog"] = "${version}"'`
    );
  },
};

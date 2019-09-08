module.exports = {
  monorepo: {
    readVersionFrom: 'package.json',
    packagesToBump: ['packages/*', 'examples/*'],
    packagesToPublish: ['packages/*'],
  },
  versionUpdated: ({ version, dir, exec }) => {
    const updateVersion = (filePath, expression) =>
      exec(`npx json -I -f ${filePath} -e '${expression} = "${version}"'`);

    updateVersion(
      'examples/blog/package.json',
      'this.dependencies["gatsby-theme-mdx-blog"]'
    );
    updateVersion(
      'examples/tailwind/package.json',
      'this.dependencies["gatsby-theme-mdx-tailwind-blog"]'
    );
  },
};

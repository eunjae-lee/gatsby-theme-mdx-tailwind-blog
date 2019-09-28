import parseArgs from 'arg';
import shell from 'shelljs';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { camelCase } from 'change-case';
import path from 'path';
import fs from 'fs';

export async function cli(argv) {
  const { dir = '.' } = camelizeKeys(
    parseArgs(
      {
        '--dir': String,

        // Aliases
        '-d': '--dir',
      },
      { permissive: false, argv }
    )
  );

  const { projectName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Type the project name:',
    },
  ]);
  if (!projectName) {
    throw new Error('The project name is required.');
  }
  const {
    packageManager,
    installSyntaxHighlightTheme,
    injectSample,
    injectComponents,
    createGitRepo,
  } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Which package manager?',
      choices: ['Yarn', 'npm'],
    },
    {
      type: 'confirm',
      name: 'installSyntaxHighlightTheme',
      message: 'Install a syntax highlight theme?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'injectSample',
      message: 'Inject some sample pages?',
      default: true,
    },
    {
      type: 'confirm',
      name: 'injectComponents',
      message: 'Inject the components for easier shadowing?',
      default: false,
    },
    {
      type: 'confirm',
      name: 'createGitRepo',
      message: 'Create a git repository?',
      default: false,
    },
  ]);

  generate({
    dir,
    projectName,
    packageManager,
    installSyntaxHighlightTheme,
    injectSample,
    injectComponents,
    createGitRepo,
  });
}

function generate({
  dir,
  projectName,
  packageManager,
  installSyntaxHighlightTheme,
  injectSample,
  injectComponents,
  createGitRepo,
}) {
  const projectDir = path.resolve(dir, projectName);
  shell.mkdir(projectDir);
  exec('npm init -y', projectDir);
  const packageJson = JSON.parse(
    fs.readFileSync(path.resolve(projectDir, 'package.json')).toString()
  );
  packageJson.scripts.develop = 'gatsby develop';
  packageJson.scripts.build = 'gatsby build';
  fs.writeFileSync(
    path.resolve(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  fs.writeFileSync(
    path.resolve(projectDir, 'gatsby-config.js'),
    `module.exports = {
  siteMetadata: {
    title: "Site title",
    author: "Your name",
    description: "Your description",
  },
  plugins: ["gatsby-theme-mdx-blog", "gatsby-theme-mdx-tailwind-blog"],
};`
  );
  if (installSyntaxHighlightTheme) {
    fs.writeFileSync(
      path.resolve(projectDir, 'gatsby-browser.js'),
      `import 'prism-themes/themes/prism-darcula.css';\n`
    );
  }
  shell.mkdir('-p', path.resolve(projectDir, 'src', 'pages'));

  fs.writeFileSync(
    path.resolve(projectDir, 'src', 'pages', 'about.js'),
    `import React from 'react';
import { Layout } from 'gatsby-theme-mdx-blog';
export default () => (
  <Layout title="About" className="mt-8 mx-4 md:mt-12 md:mx-8 font-light">
    <p>This is About page.</p>
  </Layout>
);`
  );

  if (injectSample) {
    const pagesDir = path.resolve(__dirname, 'templates', 'pages');
    shell.cp(
      '-R',
      path.resolve(pagesDir, 'first/'),
      path.resolve(projectDir, 'src', 'pages')
    );
    shell.cp(
      '-R',
      path.resolve(pagesDir, 'create-post-on-gatsby-with-hygen/'),
      path.resolve(projectDir, 'src', 'pages')
    );
  }

  if (injectComponents) {
    shell.cp(
      '-R',
      path.resolve(__dirname, 'gatsby-theme-mdx-blog/'),
      path.resolve(projectDir, 'src')
    );
  }

  fs.writeFileSync(
    path.resolve(projectDir, '.gitignore'),
    `node_modules
public
.cache
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*`
  );

  const packagesToAdd = [
    'gatsby',
    'gatsby-theme-mdx-blog',
    'gatsby-theme-mdx-tailwind-blog',
    'react',
    'react-dom',
    installSyntaxHighlightTheme ? 'prism-themes' : undefined,
  ]
    .filter(Boolean)
    .join(' ');
  if (packageManager === 'Yarn') {
    exec(`yarn add ${packagesToAdd}`, projectDir);
  } else if (packageManager === 'npm') {
    exec(`npm install ${packagesToAdd}`, projectDir);
  }

  exec(`git init`, projectDir);
  exec(`git add .`, projectDir);
  exec(`git commit -m "initial commit"`, projectDir);

  if (createGitRepo) {
    const { code } = shell.exec('hub --version', {
      cwd: projectDir,
      silent: true,
    });
    if (code === 0) {
      exec(`hub create --browse`, projectDir);
    } else {
      console.log(
        chalk.yellow(
          'Failed to create a git repository because `hub` is not found.'
        )
      );
      console.log('After installing `hub`, please try the following:');
      console.log('  > hub create --browse');
    }
  }

  console.log(chalk.green('Installation complete.'));
  console.log(chalk.cyan('Try the following commands to run your blog:'));
  if (dir === '.') {
    console.log(`  > cd ${projectName}`);
  } else {
    console.log(`  > cd ${projectDir}`);
  }
  if (packageManager === 'Yarn') {
    console.log(`  > yarn develop`);
  } else if (packageManager === 'npm') {
    console.log(`  > npm run develop`);
  }
}

function exec(command, dir) {
  const cwd = path.resolve(dir);
  const result = shell.exec(command, { cwd });

  if (result.code !== 0) {
    throw new Error(
      [
        'The following command failed.',
        `Command: ${command}`,
        `Working directory: ${cwd}`,
        `Exit code: ${result.code}`,
      ].join('\n')
    );
  }
  return result;
}

function camelizeKeys(opts) {
  return Object.entries(opts).reduce((acc, [key, value]) => {
    // eslint-disable-next-line no-param-reassign
    acc[camelCase(key)] = value;
    return acc;
  }, {});
}

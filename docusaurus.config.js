// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'JiffyScan',
  tagline: 'UserOp Explorer for 4337 lead Account Abstraction',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://docs.jiffyscan.xyz',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark',
      },
      navbar: {
        title: 'JiffyScan',
        logo: {
          alt: 'My Site Logo',
          src: 'img/jiffy.svg',
          href: 'https://app.jiffyscan.xyz',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Docs',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://jiffyscan.readme.io/',
            label: 'API',
            position: 'left',
          },
          {
            href: 'https://app.jiffyscan.xyz/',
            label: 'App',
            position: 'right',
          },
          {
            href: 'https://github.com/jiffy-labs/jiffyscan-docs',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Tutorial',
            items: [
              {
                label: 'Docs',
                to: '/',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/JiffyScan',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'App',
                href: 'https://app.jiffyscan.xyz/',
              },
              {
                label: 'API',
                href: 'https://jiffyscan.readme.io/',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/jiffy-labs/jiffyscan-docs',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} JiffyLabs, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

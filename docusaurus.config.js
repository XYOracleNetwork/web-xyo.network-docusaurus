// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'XYO Platform',
  tagline: 'Sovereignty, Provenance and Permanence using Blockchain',
  favicon: 'favicon.ico',

  // Set the production url of your site here
  url: 'https://xyo.network',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'XYOracleNetwork', // Usually your GitHub org/user name.
  // projectName: 'sdk-xyo-client-js', // Usually your repo name.

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
          sidebarPath: require.resolve('./sidebars.js')
        },
        blog: {
          showReadingTime: true
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
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      navbar: {
        title: 'XYO Platform',
        logo: {
          alt: 'XYO Logo',
          src: 'img/logo.svg',
        },
        items: [
          {to: 'docs/getting-started/intro', label: 'Getting Started', position: 'left'},
          {to: 'docs/sdks/javascript', label: 'SDKs', position: 'left'},
          {
            href: 'https://github.com/XYOracleNetwork',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started/intro',
              },
              {
                label: 'SDKs',
                to: '/docs/sdks/javascript',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              /*{
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/xyo',
              },*/
              {
                label: 'Discord',
                href: 'https://discord.gg/officialxyo',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/OfficialXYO',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/XYOracleNetwork',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} XY Labs, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;

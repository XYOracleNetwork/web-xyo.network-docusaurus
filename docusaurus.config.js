// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')

/** @type {import('@docusaurus/types').Config} */
const config = {
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  favicon: 'favicon.ico',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'XYOracleNetwork', // Usually your GitHub org/user name.
  // projectName: 'sdk-xyo-client-js', // Usually your repo name.
  onBrokenLinks: 'throw',

  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/', // Serve the docs at the site's root
        },
        /*blog: {
          showReadingTime: true
        },*/
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  tagline: 'Sovereignty, Provenance and Permanence using Blockchain',

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} XY Labs, Inc.`,
        links: [
          {
            items: [
              {
                label: 'Getting Started',
                to: '/getting-started/intro',
              },
              {
                label: 'SDKs',
                to: '/sdks/javascript',
              },
            ],
            title: 'Docs',
          },
          {
            items: [
              /*{
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/xyo',
              },*/
              {
                href: 'https://discord.gg/officialxyo',
                label: 'Discord',
              },
              {
                href: 'https://twitter.com/OfficialXYO',
                label: 'Twitter',
              },
            ],
            title: 'Community',
          },
          {
            items: [
              {
                href: 'https://github.com/XYOracleNetwork',
                label: 'GitHub',
              },
            ],
            title: 'More',
          },
        ],
        style: 'dark',
      },

      glossary: {
        sentinel:
          'An Archivist is where Bound Witness and Payload data is stored. A shared, hosted, or self-hosted archivist can be used. It is even possible to run an archivist on the same device as the Sentinel and Bridge.',
      },
      // Replace with your project's social card
      image: 'img/social-card.jpg',
      navbar: {
        items: [
          { label: 'Getting Started', position: 'left', to: 'getting-started/intro' },
          { label: 'SDKs', position: 'left', to: 'sdks/javascript' },
          {
            href: 'https://github.com/XYOracleNetwork',
            label: 'GitHub',
            position: 'right',
          },
        ],
        logo: {
          alt: 'XYO Logo',
          src: 'img/logo.svg',
        },
        title: 'XYO Platform (Pre-release Docs)',
      },
      prism: {
        darkTheme: darkCodeTheme,
        theme: lightCodeTheme,
      },
    }),

  title: 'XYO Platform',

  // Set the production url of your site here
  url: 'https://docs.xyo.network',
}

module.exports = config

import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes } from 'prism-react-renderer'

const config: Config = {
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
  onBrokenLinks: 'warn',

  onBrokenMarkdownLinks: 'warn',

  plugins: [
    [
      'docusaurus-plugin-remote-content',
      {
        // the base directory to output to.
        documents: [
          'XYOracleNetwork/plugins/main/README.md',
          'XYOracleNetwork/sdk-xyo-client-swift/main/README.md',
          'XYOracleNetwork/sdk-xyo-client-android/main/README.md',
          'XYOracleNetwork/sdk-xyo-client-js/main/README.md',
          'XYOracleNetwork/sdk-xyo-react-js/main/README.md',
          'XYOracleNetwork/plugins/main/README.md',
          'XYOracleNetwork/clients/main/README.md',
        ],

        // options here
        name: 'readme-files',

        // the base url for the markdown (gets prepended to all of the documents when fetching)
        outDir: 'external_markdown',
        // used by CLI, must be path safe
        sourceBaseUrl: 'https://raw.githubusercontent.com/', // the file names to download
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          // Serve the docs at the site's root
          path: 'docs',

          routeBasePath: '/',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        /* blog: {
          showReadingTime: true
        }, */
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
  ],

  tagline: 'Sovereignty, Provenance and Permanence using Blockchain',

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: false,
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} XY Labs, Inc.`,
        links: [
          {
            items: [
              {
                label: 'Getting Started',
                to: '/getting-started',
              },
              {
                label: 'SDKs',
                to: '/developing-with-xyo/sdks/',
              },
            ],
            title: 'Docs',
          },
          {
            items: [
              /* {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/xyo',
              }, */
              {
                href: 'https://discord.gg/officialxyo',
                label: 'Discord',
              },
              {
                href: 'https://twitter.com/OfficialXYO',
                label: 'Twitter',
              },
              {
                href: 'https://facebook.com/OfficialXYO',
                label: 'Facebook',
              },
              {
                href: 'https://www.instagram.com/officialxyo',
                label: 'Instagram',
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
      },

      glossary: {
        sentinel:
          'An Archivist is where Bound Witness and Payload data is stored. A shared, hosted, or self-hosted archivist can be used. It is even possible to run an archivist on the same device as the Sentinel and Bridge.',
      },
      // Replace with your project's social card
      image: 'img/social-card.png',
      navbar: {
        items: [
          {
            label: 'Getting Started', position: 'left', to: '/getting-started',
          },
          // { label: 'Host', position: 'left', to: '/hosting-an-xyo-node' },
          {
            label: 'Develop', position: 'left', to: '/developing-with-xyo',
          },
          {
            label: 'SDKs', position: 'left', to: '/developing-with-xyo/sdks/',
          },
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
        style: 'dark',
        title: 'XYO Platform (Pre-release Docs)',
      },
      prism: {
        darkTheme: themes.dracula,
        theme: themes.github,
      },
    } satisfies Preset.ThemeConfig,

  title: 'XYO Platform',

  // Set the production url of your site here
  url: 'https://docs.xyo.network',
}

module.exports = config

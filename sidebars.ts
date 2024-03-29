import { SidebarsConfig } from '@docusaurus/plugin-content-docs'

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  rootSidebar: [
    { id: 'index', type: 'doc' },
    {
      id: 'getting-started/index',
      type: 'doc',
    },
    {
      items: [{ dirName: 'using-xyo', type: 'autogenerated' }],
      label: 'Using XYO',
      link: { id: 'using-xyo/index', type: 'doc' },
      type: 'category',
    },
    {
      items: [{ dirName: 'developing-with-xyo', type: 'autogenerated' }],
      label: 'Developing with XYO',
      link: { id: 'developing-with-xyo/index', type: 'doc' },
      type: 'category',
    },
    {
      id: 'glossary',
      type: 'doc',
    },
  ],
}

module.exports = sidebars

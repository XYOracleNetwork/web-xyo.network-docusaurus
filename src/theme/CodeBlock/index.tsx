import React from 'react'

import { Demo } from '../../components'

const DemoCodeBlock = ({ className, children, ...props }) => {
  return <Demo demo={{sourceLanguage: className.split('-').pop(), rawTS: children as string, raw: children as string, rawJS: children as string, jsxPreview: children as string}} demoOptions={{demo: 'test.js', defaultCodeOpen: true}} githubLocation='yo1' />
}

// eslint-disable-next-line import/no-default-export
export default DemoCodeBlock

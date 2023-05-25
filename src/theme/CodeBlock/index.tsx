import React from 'react'

import { Demo } from '../../components'

const DemoCodeBlock = ({ children, ...props }) => {
  console.log(`Props: ${JSON.stringify(props, null, 2)}`)
  return <Demo demo={{rawTS: children as string, rawJS: children as string}} demoOptions={{demo: 'test.js', defaultCodeOpen: true}} githubLocation='yo1' />
}

// eslint-disable-next-line import/no-default-export
export default DemoCodeBlock

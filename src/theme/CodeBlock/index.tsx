import { CodeVariantProvider } from '@site/src/components/Demo/utils'
import React from 'react'

import { Demo } from '../../components'

const DemoCodeBlock = ({ className, children }) => {
  return (
    <CodeVariantProvider value={{ codeVariant: 'TS' }}>
      <Demo
        demo={{
          githubLocation: 'https://github.com/XYOracleNetwork',
          jsxPreview: children as string,
          language: 'en',
          raw: children as string,
          rawJS: children as string,
          rawTS: children as string,
          sourceLanguage: className.split('-').pop(),
          title: 'title',
        }}
        demoOptions={{ defaultCodeOpen: true, demo: 'test.js' }}
        githubLocation="yo1"
      />
    </CodeVariantProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default DemoCodeBlock

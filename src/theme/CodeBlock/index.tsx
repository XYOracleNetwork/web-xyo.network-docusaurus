import { Demo } from '@site/src/components/Demo'
import { CodeVariantProvider } from '@site/src/components/Demo/utils'
import React from 'react'

const DemoCodeBlock = ({ className, children }) => {
  console.log('CodeBlock')
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

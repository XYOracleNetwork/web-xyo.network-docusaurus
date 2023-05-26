/* eslint-disable @typescript-eslint/no-var-requires */
import { Demo } from '@site/src/components/Demo'
import { CodeVariantProvider } from '@site/src/components/Demo/utils'
import React from 'react'

const DemoCodeBlock = ({ code, children, title }) => {
  let tsxCode = ''
  let jsxCode = ''
  let previewCode = ''
  try {
    tsxCode = require(`!!raw-loader!@site/docs/${code}.tsx`).default ?? children ?? ''
  } catch (_ex) {
    null
  }
  try {
    jsxCode = require(`!!raw-loader!@site/docs/${code}.jsx`).default ?? children ?? ''
  } catch (_ex) {
    null
  }
  try {
    previewCode = require(`!!raw-loader!@site/docs/${code}.tsx.preview`).default ?? children ?? ''
  } catch (_ex) {
    null
  }

  return (
    <CodeVariantProvider value={{ codeVariant: 'TS' }}>
      <Demo
        demo={{
          githubLocation: 'https://github.com/XYOracleNetwork',
          jsxPreview: previewCode,
          language: 'en',
          raw: jsxCode,
          rawJS: jsxCode,
          rawTS: tsxCode,
          sourceLanguage: 'tsx',
          title,
        }}
        demoOptions={{ defaultCodeOpen: true, demo: 'test.js' }}
        githubLocation="yo1"
      />
    </CodeVariantProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default DemoCodeBlock

/* eslint-disable @typescript-eslint/no-var-requires */
import { Demo } from '@site/src/components/Demo'
import { CodeVariantProvider } from '@site/src/components/Demo/utils'
import React, { ReactNode } from 'react'

interface DemoCodeBlockProps {
  children: ReactNode
  className: string
  code: string
  title: string
}

const DemoCodeBlock: React.FC<DemoCodeBlockProps> = (props) => {
  const { code, className, children, title, ...otherProps } = props
  console.log(`DemoCodeBlock: ${JSON.stringify(otherProps)}`)

  const sourceLanguage = className
    .split(' ')
    .find((value) => value.startsWith('language-'))
    .split('-')
    .pop()

  let tsxCode = ''
  let jsxCode = ''
  let previewCode = ''
  let ext = 'jsx'
  try {
    tsxCode = require(`!!raw-loader!@site/docs/${code}.tsx`).default ?? children ?? ''
    ext = 'tsx'
  } catch (_ex) {
    null
  }
  try {
    jsxCode = require(`!!raw-loader!@site/docs/${code}.jsx`).default ?? children ?? ''
    ext = 'jsx'
  } catch (_ex) {
    null
  }
  try {
    previewCode = require(`!!raw-loader!@site/docs/${code}.tsx.preview`).default ?? children ?? ''
    ext = 'tsx.preview'
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
          sourceLanguage: sourceLanguage,
          title,
        }}
        demoOptions={{ defaultCodeOpen: true, demo: 'test.js' }}
        githubLocation={`https://github.com/XYOracleNetwork/web-xyo.network-docusaurus/tree/main/docs/${code}.${ext}`}
      />
    </CodeVariantProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default DemoCodeBlock

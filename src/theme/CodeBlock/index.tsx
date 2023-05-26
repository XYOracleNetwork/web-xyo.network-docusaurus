/* eslint-disable @typescript-eslint/no-var-requires, import/no-internal-modules */
import { Demo } from '@site/src/components/Demo'
import { CodeVariantProvider } from '@site/src/components/Demo/utils'
import React, { ReactNode } from 'react'

interface DemoCodeBlockProps {
  children: ReactNode
  className: string
  code: string
  deps: string
  title: string
}

const DemoCodeBlock: React.FC<DemoCodeBlockProps> = (props) => {
  const { code, deps: rawDeps = '[]', className = '', children, title, ...otherProps } = props

  const deps = JSON.parse(rawDeps)

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
    tsxCode = require(`!!raw-loader!@site/docs/${code}/demo.tsx`).default ?? children ?? ''
    ext = 'tsx'
  } catch (_ex) {
    null
  }
  try {
    jsxCode = require(`!!raw-loader!@site/docs/${code}/demo.jsx`).default ?? children ?? ''
    ext = 'jsx'
  } catch (_ex) {
    null
  }
  try {
    previewCode = require(`!!raw-loader!@site/docs/${code}/demo.tsx.preview`).default ?? children ?? ''
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
        deps={deps}
      />
    </CodeVariantProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default DemoCodeBlock

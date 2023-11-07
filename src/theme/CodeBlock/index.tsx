/* eslint-disable @typescript-eslint/no-var-requires, import/no-internal-modules */
import * as mui_icons from '@mui/icons-material'
import { Paper } from '@mui/material'
import * as mui from '@mui/material'
import { Demo, DemoCodeViewer } from '@site/src/components/Demo'
import { ReactRunner } from '@site/src/components/Demo/ReactRunner'
import { CodeVariantProvider } from '@site/src/components/Demo/utils'
import { FlexRow } from '@xylabs/react-flexbox'
import * as xyoClient from '@xyo-network/sdk-xyo-client-js'
import * as xyoReact from '@xyo-network/sdk-xyo-react'
import React, { ReactNode } from 'react'

interface DemoCodeBlockProps {
  children: ReactNode
  className: string
  code: string
  deps: string
  title: string
}

const DemoCodeBlock: React.FC<DemoCodeBlockProps> = (props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  let ext = null
  try {
    tsxCode = require(`!!raw-loader!@site/docs_src/${code}/demo.tsx`).default ?? children ?? ''
    ext = 'tsx'
  } catch (_ex) {
    null
  }
  try {
    jsxCode = require(`!!raw-loader!@site/docs_src/${code}/demo.jsx`).default ?? children ?? ''
    ext = 'jsx'
  } catch (_ex) {
    null
  }
  try {
    previewCode = require(`!!raw-loader!@site/docs_src/${code}/demo.tsx.preview`).default ?? children ?? ''
    ext = 'tsx.preview'
  } catch (_ex) {
    null
  }

  const previewCodeOrChildren = (children as string) ?? previewCode

  return (
    <CodeVariantProvider value={{ codeVariant: 'TS' }}>
      {ext === null ? (
        <DemoCodeViewer
          code={previewCodeOrChildren}
          language="sh"
          copyButtonProps={{
            'data-ga-event-action': 'copy-click',
            'data-ga-event-category': true,
            'data-ga-event-label': '',
          }}
        />
      ) : (
        <>
          <Paper>
            <FlexRow padding={2}>
              <ReactRunner
                scope={{
                  import: {
                    '@mui/icons-material': mui_icons,
                    '@mui/material': mui,
                    '@xyo-network/sdk-xyo-client-js': xyoClient,
                    '@xyo-network/sdk-xyo-react': xyoReact,
                    react: React,
                  },
                  process: {},
                }}
                onError={(error) => console.error(JSON.stringify(error, null, 2))}
                code={jsxCode}
              />
            </FlexRow>
          </Paper>
          <Demo
            demo={{
              githubLocation: 'https://github.com/XYOracleNetwork',
              jsx: Paper,
              jsxPreview: previewCodeOrChildren,
              language: 'en',
              raw: jsxCode,
              rawJS: jsxCode,
              rawTS: tsxCode,
              sourceLanguage: sourceLanguage,
              title,
              tsx: Paper,
            }}
            demoOptions={{ defaultCodeOpen: true, demo: 'demo.js' }}
            githubLocation={`https://github.com/XYOracleNetwork/web-xyo.network-docusaurus/tree/main/docs_src/${code}/demo.${ext}`}
            deps={deps}
          />
        </>
      )}
    </CodeVariantProvider>
  )
}

// eslint-disable-next-line import/no-default-export
export default DemoCodeBlock

import * as mui_icons from '@mui/icons-material'
import { Paper } from '@mui/material'
import * as mui from '@mui/material'
import type { DemoProps } from '@site/src/components/Demo'
import { Demo, DemoCodeViewer } from '@site/src/components/Demo'
// eslint-disable-next-line import-x/no-internal-modules
import { ReactRunner } from '@site/src/components/Demo/ReactRunner'
import { CodeVariantProvider } from '@site/src/components/Demo/utils'
import { FlexRow } from '@xylabs/react-flexbox'
import { usePromise } from '@xylabs/react-promise'
import * as protocol from '@xyo-network/protocol'
import type { FunctionComponent, ReactNode } from 'react'
import React from 'react'

interface DemoCodeBlockProps {
  children: ReactNode
  className: string
  code: string
  deps: string
  title: string
}

const DemoCodeBlock: React.FC<DemoCodeBlockProps> = (props) => {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    code, deps: rawDeps = '[]', className = '', children, title, ...otherProps
  } = props

  const deps = JSON.parse(rawDeps)

  const sourceLanguage = className
    ?.split(' ')
    ?.find(value => value.startsWith('language-'))
    ?.split('-')
    .pop()

  const [tsxCode] = usePromise(() => import(`!!raw-loader!@site/docs/${code}/demo.tsx`), [code])
  const [jsxCode] = usePromise(() => import(`!!raw-loader!@site/docs/${code}/demo.jsx`), [code])
  const [previewCode] = usePromise(() => import(`!!raw-loader!@site/docs/${code}/demo.tsx.preview`), [code])

  const ext = tsxCode ? 'tsx' : jsxCode ? 'jsx' : previewCode ? 'tsx.preview' : null

  const previewCodeOrChildren = previewCode ?? (children as string)

  return (
    <CodeVariantProvider value={{ codeVariant: 'TS' }}>
      {ext === null
        ? (
            <DemoCodeViewer
              code={previewCodeOrChildren}
              language="sh"
              copyButtonProps={{
                'data-ga-event-action': 'copy-click',
                'data-ga-event-category': true,
                'data-ga-event-label': '',
              }}
            />
          )
        : (
            <>
              <Paper>
                <FlexRow padding={2}>
                  <ReactRunner
                    scope={{
                      import: {
                        '@mui/icons-material': mui_icons,
                        '@mui/material': mui,
                        '@xyo-network/protocol': protocol,
                        'react': React,
                      },
                      process: {},
                    }}
                    onError={error => console.error(JSON.stringify(error, null, 2))}
                    code={jsxCode}
                  />
                </FlexRow>
              </Paper>
              <Demo
                demo={{
                  githubLocation: 'https://github.com/XYOracleNetwork',
                  jsx: Paper as FunctionComponent<DemoProps>,
                  jsxPreview: previewCodeOrChildren,
                  language: 'en',
                  raw: jsxCode,
                  rawJS: jsxCode,
                  rawTS: tsxCode,
                  sourceLanguage: sourceLanguage,
                  title,
                  tsx: Paper as FunctionComponent<DemoProps>,
                }}
                demoOptions={{ defaultCodeOpen: false, demo: 'demo.js' }}
                githubLocation={`https://github.com/XYOracleNetwork/web-xyo.network-docusaurus/tree/main/docs/${code}/demo.${ext}`}
                deps={deps}
              />
            </>
          )}
    </CodeVariantProvider>
  )
}

export default DemoCodeBlock

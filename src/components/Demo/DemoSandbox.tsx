import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { styled, useTheme } from '@mui/material/styles'
import { jssPreset, StylesProvider } from '@mui/styles'
import { create } from 'jss'
import rtl from 'jss-rtl'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { StyleSheetManager } from 'styled-components'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'

import { DemoErrorBoundary } from './DemoErrorBoundary'

export type FramedDemoProps = React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> & {
  children: React.ReactNode
  document: Document
}

const FramedDemo: React.FC<FramedDemoProps> = (props) => {
  const { children, document } = props

  const theme = useTheme()
  React.useEffect(() => {
    document.body.dir = theme.direction
  }, [document, theme.direction])

  const { jss, sheetsManager } = React.useMemo(() => {
    return {
      jss: create({
        insertionPoint: document.head,
        plugins: [...jssPreset().plugins, rtl()],
      }),
      sheetsManager: new Map(),
    }
  }, [document])

  const cache = React.useMemo(
    () =>
      createCache({
        container: document.head,
        key: `iframe-demo-${theme.direction}`,
        prepend: true,
        stylisPlugins: theme.direction === 'rtl' ? [prefixer, rtlPlugin] : [prefixer],
      }),
    [document, theme.direction],
  )

  const getWindow = React.useCallback(() => document.defaultView, [document])

  return (
    <StylesProvider jss={jss} sheetsManager={sheetsManager}>
      <StyleSheetManager target={document.head} stylisPlugins={theme.direction === 'rtl' ? [rtlPlugin] : []}>
        <CacheProvider value={cache}>
          {Array.isArray(children)
            ? children.map(child =>
              React.cloneElement(child, { window: getWindow }))
            : children}
        </CacheProvider>
      </StyleSheetManager>
    </StylesProvider>
  )
}

const Iframe = styled('iframe')(({ theme }) => ({
  backgroundColor: (theme.vars || theme).palette.background.default,
  border: 0,
  boxShadow: (theme.vars || theme).shadows[1],
  flexGrow: 1,
  height: 400,
}))

export interface DemoIframeProps extends React.DetailedHTMLProps<React.IframeHTMLAttributes<HTMLIFrameElement>, HTMLIFrameElement> {
  name: string
}

const DemoIframe: React.FC<DemoIframeProps> = (props) => {
  const {
    children, name, ...other
  } = props
  /**
   * @type {import('react').Ref<HTMLIFrameElement>}
   */
  const frameRef = React.useRef(null)

  // If we portal content into the iframe before the load event then that content
  // is dropped in firefox.
  const [iframeLoaded, onLoad] = React.useReducer(() => true, false)

  React.useEffect(() => {
    const document = frameRef.current.contentDocument
    // When we hydrate the iframe then the load event is already dispatched
    // once the iframe markup is parsed (maybe later but the important part is
    // that it happens before React can attach event listeners).
    // We need to check the readyState of the document once the iframe is mounted
    // and "replay" the missed load event.
    // See https://github.com/facebook/react/pull/13862 for ongoing effort in React
    // (though not with iframes in mind).
    if (document != null && document.readyState === 'complete' && !iframeLoaded) {
      onLoad()
    }
  }, [iframeLoaded])

  const document = frameRef.current?.contentDocument
  return (
    <React.Fragment>
      <Iframe onLoad={onLoad} ref={frameRef} title={`${name} demo`} {...other} />
      {iframeLoaded === false ? null : ReactDOM.createPortal(<FramedDemo document={document}>{children}</FramedDemo>, document.body)}
    </React.Fragment>
  )
}

export interface DemoSandboxProps extends React.HTMLProps<'div'> {
  iframe?: boolean
  name: string
  onResetDemoClick: () => void
}

/**
 * Isolates the demo component as best as possible. Additional props are spread
 * to an `iframe` if `iframe={true}`.
 */
export const DemoSandbox: React.FC<DemoSandboxProps> = (props) => {
  const {
    children: childrenProp, iframe = false, name, onResetDemoClick, ...other
  } = props
  const sandboxProps = iframe ? { name, ...other } : {}

  // `childrenProp` needs to be a child of `Sandbox` since the iframe implementation rely on `cloneElement`.
  const children = iframe
    ? (
        <DemoIframe name={name} {...sandboxProps}>
          {childrenProp}
        </DemoIframe>
      )
    : null

  return (
    <DemoErrorBoundary name={name} onResetDemoClick={onResetDemoClick}>
      {children}
    </DemoErrorBoundary>
  )
}

export const DemoSandboxMemo = React.memo(DemoSandbox)

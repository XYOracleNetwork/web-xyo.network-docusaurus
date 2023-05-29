/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable complexity */
/* eslint-disable max-statements */
import NoSsr from '@mui/base/NoSsr'
import { Collapse, Paper } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import { debounce } from '@mui/material/utils'
import { unstable_useId as useId } from '@mui/utils'
import { WithChildren } from '@xylabs/react-shared'
import * as React from 'react'

import { CODE_VARIANT } from './constants'
import { DemoEditor } from './DemoEditor'
import { DemoEditorError } from './DemoEditorError'
import { DemoSandbox } from './DemoSandbox'
import { DemoToolbar } from './DemoToolbar'
import { HighlightedCode } from './HighlightedCode'
import { ReactRunner, ReactRunnerScope } from './ReactRunner'
import { DependenciesSet } from './sandbox/getDependencies'
import { useCodeVariant } from './utils'

export interface DemoOptions {
  bg?: string | boolean
  defaultCodeOpen?: boolean
  demo: string
  disableLiveEdit?: boolean
  hideEditButton?: boolean
  hideToolbar?: boolean
  iframe?: boolean
}

/**
 * Removes leading spaces (indentation) present in the `.tsx` previews
 * to be able to replace the existing code with the incoming dynamic code
 * @param {string} input
 */
function trimLeadingSpaces(input = '') {
  return input.replace(/^\s+/gm, '')
}

// Sync with styles from DemoToolbar
// Importing the styles results in no bundle size reduction
const DemoToolbarFallbackRoot = styled('div')(({ theme }) => {
  return {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      height: theme.spacing(8),
    },
  }
})

export function DemoToolbarFallback() {
  return <DemoToolbarFallbackRoot aria-busy aria-label={'demo source'} role="toolbar" />
}

function getDemoName(location: string) {
  return location.replace(/(.+?)(\w+)\.\w+$$/, '$2')
}

export interface DemoConfig {
  codeVariant: 'JS' | 'TS'
  gaLabel?: string
  githubLocation: string
  jsx?: React.FC
  jsxPreview: string
  language: string
  raw: string
  rawJS?: string
  rawTS?: string
  scope?: ReactRunnerScope
  sourceLanguage?: string
  title: string
  tsx?: React.FC
}

function useDemoData(
  codeVariant: 'TS' | 'JS',
  demo: Omit<DemoConfig, 'codeVariant'> & { codeVariant?: CODE_VARIANT },
  githubLocation: string,
): DemoConfig {
  const userLanguage = 'en'

  return React.useMemo<DemoConfig>(() => {
    let product
    const name = 'XYO Network'

    return {
      jsxPreview: demo.jsxPreview,
      scope: demo.scope,
      ...(codeVariant === 'TS' && demo.rawTS
        ? {
            Component: demo.tsx,
            codeVariant: 'TS',
            githubLocation: githubLocation?.replace(/\.js$/, '.tsx'),
            raw: demo.rawTS,
            sourceLanguage: demo.sourceLanguage ?? 'typescript',
          }
        : {
            Component: demo.jsx,
            codeVariant: 'JS',
            githubLocation,
            jsx: Demo,
            raw: demo.rawJS,
            sourceLanguage: demo.sourceLanguage ?? 'javascript',
          }),
      language: userLanguage,
      product,
      title: `${getDemoName(githubLocation)} demo — ${name}`,
    }
  }, [codeVariant, demo, githubLocation, userLanguage])
}

interface EditorCode {
  initialEditorCode: string
  isPreview?: boolean
  value: string
}

function useDemoElement({ demoData, editorCode, setDebouncedError, liveDemoActive }) {
  const debouncedSetError = React.useMemo(() => debounce(setDebouncedError, 300), [setDebouncedError])

  React.useEffect(() => {
    return () => {
      debouncedSetError.clear()
    }
  }, [debouncedSetError])

  console.log(`demoData.scope: ${demoData.scope}`)

  // Memoize to avoid rendering the demo more than it needs to be.
  // For example, avoid a render when the demo is hovered.
  const BundledComponent = React.useMemo(() => <demoData.Component />, [demoData])
  const LiveComponent = React.useMemo(
    () => (
      <ReactRunner
        scope={demoData.scope}
        onError={debouncedSetError}
        code={
          editorCode.isPreview ? trimLeadingSpaces(demoData.raw).replace(trimLeadingSpaces(demoData.jsxPreview), editorCode.value) : editorCode.value
        }
      />
    ),
    [demoData, debouncedSetError, editorCode.isPreview, editorCode.value],
  )

  // No need for a live environment if the code matches with the component rendered server-side.
  return editorCode.value === editorCode.initialEditorCode && liveDemoActive === false ? BundledComponent : LiveComponent
}

const Root = styled('div')(({ theme }) => ({
  marginBottom: 24,
  marginLeft: theme.spacing(-2),
  marginRight: theme.spacing(-2),
  [theme.breakpoints.up('sm')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}))

const DemoCodeViewer = styled(HighlightedCode)(({ theme }) => ({
  '& pre': {
    borderRadius: 0,
    margin: 0,
    maxHeight: 'min(68vh, 1000px)',
    maxWidth: 'initial',
    [theme.breakpoints.up('sm')]: {
      borderRadius: theme.shape.borderRadius,
    },
  },
}))

const AnchorLink = styled('div')({
  marginTop: -64, // height of toolbar
  position: 'absolute',
})

const InitialFocus = styled(IconButton)(({ theme }) => ({
  height: theme.spacing(4),
  left: 0,
  pointerEvents: 'none',
  position: 'absolute',
  top: 0,
  width: theme.spacing(4),
}))

export interface DemoProps {
  demo: Omit<DemoConfig, 'codeVariant'> & { codeVariant?: CODE_VARIANT }
  demoOptions: DemoOptions
  deps?: DependenciesSet[]
  githubLocation: string
}

export const Demo: React.FC<DemoProps> = (props) => {
  const { demo, demoOptions, deps = [], githubLocation } = props

  if (!demoOptions.demo.endsWith('.js') && demoOptions.hideToolbar !== true) {
    throw new Error(
      [
        `The following demos use TS directly: ${demoOptions.demo}.`,
        '',
        'Please run "yarn docs:typescript:formatted" to generate a JS version and reference it:',
        `{{"demo": "${demoOptions.demo?.replace(/\.(.*)$/, '.js')}", …}}.`,
        '',
        "Otherwise, if it's not a code demo hide the toolbar:",
        `{{"demo": "${demoOptions.demo}", "hideToolbar": true, …}}.`,
      ].join('\n'),
    )
  }

  const codeVariant = useCodeVariant()
  const demoData = useDemoData(codeVariant, demo, githubLocation)

  const [demoHovered, setDemoHovered] = React.useState(false)
  const handleDemoHover = (event) => {
    setDemoHovered(event.type === 'mouseenter')
  }

  const demoName = getDemoName(demoData.githubLocation)

  if (demoOptions.bg == null) {
    demoOptions.bg = 'outlined'
  }

  if (demoOptions.iframe) {
    demoOptions.bg = true
  }

  const [codeOpen, setCodeOpen] = React.useState(demoOptions.defaultCodeOpen || false)
  const shownOnce = React.useRef(false)
  if (codeOpen) {
    shownOnce.current = true
  }

  React.useEffect(() => {
    const navigatedDemoName = getDemoName(window.location.hash)
    if (demoName === navigatedDemoName) {
      setCodeOpen(true)
    }
  }, [demoName])

  const showPreview = !demoOptions.hideToolbar && demoOptions.defaultCodeOpen !== false && Boolean(demoData.jsxPreview)

  const [demoKey, setDemoKey] = React.useReducer((key) => key + 1, 0)

  const demoId = `demo-${useId()}`
  const demoSourceId = `demoSource-${useId()}`
  const openDemoSource = codeOpen || showPreview

  const initialFocusRef = React.useRef(null)

  const Wrapper = React.Fragment

  const isPreview = !codeOpen && showPreview
  const initialEditorCode = isPreview
    ? demoData.jsxPreview
    : // Prettier remove all the leading lines except for the last one, remove it as we don't
      // need it in the live edit view.
      demoData.raw?.replace(/\n$/, '')

  const [editorCode, setEditorCode] = React.useState<EditorCode>({
    initialEditorCode,
    isPreview,
    value: initialEditorCode,
  })

  const resetDemo = () => {
    setEditorCode({
      initialEditorCode,
      isPreview,
      value: initialEditorCode,
    })
    setDemoKey()
  }

  React.useEffect(() => {
    setEditorCode({
      initialEditorCode,
      isPreview,
      value: initialEditorCode,
    })
  }, [initialEditorCode, isPreview])

  const [debouncedError, setDebouncedError] = React.useState(null)

  const [liveDemoActive, setLiveDemoActive] = React.useState(false)

  const demoElement = useDemoElement({
    demoData,
    editorCode,
    liveDemoActive,
    setDebouncedError,
  })

  console.log(`demoElement: ${JSON.stringify(demoElement.props, null, 2)}`)

  return (
    <Root>
      <AnchorLink id={demoName} />
      <Paper id={demoId} onMouseEnter={handleDemoHover} onMouseLeave={handleDemoHover}>
        <Wrapper>
          <InitialFocus
            aria-label={'A generic container that is programmatically focused to test keyboard navigation of our components.'}
            action={initialFocusRef}
            tabIndex={-1}
          />
        </Wrapper>
        <DemoSandbox key={demoKey} /*style={demoSandboxedStyle}*/ iframe={demoOptions.iframe} name={demoName} onResetDemoClick={resetDemo}>
          {demoElement}
        </DemoSandbox>
      </Paper>
      <AnchorLink id={`${demoName}.js`} />
      <AnchorLink id={`${demoName}.tsx`} />
      <Wrapper>
        {demoOptions.hideToolbar ? null : (
          <NoSsr defer fallback={<DemoToolbarFallback />}>
            <React.Suspense fallback={<DemoToolbarFallback />}>
              <DemoToolbar
                codeOpen={codeOpen}
                demo={demo}
                demoData={demoData}
                demoHovered={demoHovered}
                demoId={demoId}
                demoName={demoName}
                demoOptions={demoOptions}
                demoSourceId={demoSourceId}
                initialFocusRef={initialFocusRef}
                onCodeOpenChange={() => {
                  setCodeOpen((open) => !open)
                }}
                onResetDemoClick={resetDemo}
                openDemoSource={openDemoSource}
                showPreview={showPreview}
                deps={deps}
              />
            </React.Suspense>
          </NoSsr>
        )}
        <Collapse in={openDemoSource} unmountOnExit>
          {/* A limitation from https://github.com/nihgwu/react-runner,
            we can't inject the `window` of the iframe so we need a disableLiveEdit option. */}
          {demoOptions.disableLiveEdit ? (
            <DemoCodeViewer
              code={editorCode.value}
              id={demoSourceId}
              language={demoData.sourceLanguage}
              copyButtonProps={{
                'data-ga-event-action': 'copy-click',
                'data-ga-event-category': codeOpen ? 'demo-expand' : 'demo',
                'data-ga-event-label': demo.gaLabel,
              }}
            />
          ) : (
            <DemoEditor
              // Mount a new text editor when the preview mode change to reset the undo/redo history.
              key={editorCode.isPreview ? 'preview' : 'not-preview'}
              value={editorCode.value}
              onChange={(value) => {
                setEditorCode({
                  ...editorCode,
                  value,
                })
              }}
              onFocus={() => {
                setLiveDemoActive(true)
              }}
              id={demoSourceId}
              language={demoData.sourceLanguage}
              copyButtonProps={{
                'data-ga-event-action': 'copy-click',
                'data-ga-event-category': codeOpen ? 'demo-expand' : 'demo',
                'data-ga-event-label': demo.gaLabel,
              }}
            >
              <DemoEditorError>{debouncedError}</DemoEditorError>
            </DemoEditor>
          )}
        </Collapse>
      </Wrapper>
    </Root>
  )
}

export type DemoWrapperProps = WithChildren<{
  code?: string
  rawJsx?: string
  rawPreview?: string
  rawTsx?: string
}>

import { NoSsr } from '@mui/base'
import Box from '@mui/material/Box'
import { styled, useTheme } from '@mui/material/styles'
import * as React from 'react'
import SimpleCodeEditor from 'react-simple-code-editor'

import { blue, blueDark } from './brandingTheme'
import { CodeCopyButton } from './CodeCopyButton'
import MarkdownElement from './MarkdownElement'
import { prismHighlight } from './prism'
import { useCodeCopy } from './utils'

const StyledMarkdownElement = styled(MarkdownElement)(({ theme }) => [
  {
    '& .scrollContainer': {
      '&:focus-within': { boxShadow: `0 0 0 2px ${theme.palette.primary.main}` },
      '&:hover': { boxShadow: `0 0 0 3px ${theme.palette.primary.light}` },
      'backgroundColor': blueDark[800],
      'colorScheme': 'dark',
      'maxHeight': 'min(68vh, 1000px)',
      'overflow': 'auto',
      [theme.breakpoints.up('sm')]: { borderRadius: theme.shape.borderRadius },
    },
    '& pre': {
      maxHeight: 'initial',
      // The scroll container needs to be the parent of the editor, overriding:
      // https://github.com/mui/material-ui/blob/269c1d0c7572fcb6ae3b270a2622d16c7e40c848/docs/src/modules/components/MarkdownElement.js#L27-L26
      maxWidth: 'initial',
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
]) as any

const StyledSimpleCodeEditor = styled(SimpleCodeEditor)(({ theme }) => ({
  ...theme.typography.body2,
  '& > textarea, & > pre': {
    // Override inline-style
    whiteSpace: 'pre !important',
  },
  '& textarea': { outline: 0 },
  'WebkitFontSmoothing': 'subpixel-antialiased',
  'color': '#f8f8f2',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  'direction': 'ltr /*! @noflip */' as any,
  'float': 'left',
  'fontSize': theme.typography.pxToRem(13),
  'fontWeight': 400,
  'minWidth': '100%',
}))

export interface DemoEditorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copyButtonProps: any
  id: string
  language: string
  onChange: (value: string) => void
  value: string
}

export const DemoEditor = (props: DemoEditorProps) => {
  const {
    language, value, onChange, copyButtonProps, children, id, ...other
  } = props
  const contextTheme = useTheme()
  const wrapperRef = React.useRef<HTMLElement | null>(null)
  const enterRef = React.useRef<HTMLElement | null>(null)
  const {
    onBlur, onFocus, onMouseEnter, onMouseLeave,
  } = useCodeCopy()

  React.useEffect(() => {
    const element = wrapperRef.current?.querySelector('textarea')
    element.tabIndex = -1
  }, [])

  return (
    <StyledMarkdownElement
      ref={wrapperRef}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
          return
        }

        if (event.key === 'Escape') {
          enterRef.current?.focus()
          return
        }

        if (event.key === 'Enter') {
          const textarea = wrapperRef.current.querySelector('textarea')
          if (textarea !== document.activeElement) {
            event.preventDefault()
            event.stopPropagation()
            textarea?.focus()
          }
        }
      }}
      {...other}
    >
      <div
        className="MuiCode-root"
        onBlur={onBlur}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseEnter}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onFocus={event => onFocus(event as any)}
      >
        <div className="scrollContainer">
          <StyledSimpleCodeEditor
            padding={contextTheme.spacing(2)}
            highlight={(code: string) => {
              const highlightedCode = prismHighlight(code, language)
              return `<code class="language-${language}">${highlightedCode}</code>`
            }}
            id={id}
            value={value}
            onValueChange={onChange}
          />
        </div>
        <Box
          ref={enterRef}
          aria-live="polite"
          tabIndex={0}
          sx={theme => ({
            '&:not(:focus)': {
              opacity: 0,
              pointerEvents: 'none',
              top: 0,
            },
            'backgroundColor': blueDark[600],
            'border': '1px solid',
            'borderColor': blue[400],
            'borderRadius': '4px',
            'color': blueDark[50],
            'fontSize': theme.typography.pxToRem(13),
            'left': '50%',
            'outline': 0,
            'padding': theme.spacing(0.5, 1),
            'position': 'absolute',
            'top': theme.spacing(1),
            'transform': 'translateX(-50%)',
            'transition': 'all 0.3s',
          })}
          dangerouslySetInnerHTML={{ __html: 'Press <kbd>Enter</kbd> to start editing' }}
        />
        <NoSsr>
          <CodeCopyButton {...copyButtonProps} code={value} />
        </NoSsr>
        {children}
      </div>
    </StyledMarkdownElement>
  )
}

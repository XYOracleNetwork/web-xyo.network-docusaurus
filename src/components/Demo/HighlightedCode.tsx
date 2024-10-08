import { NoSsr } from '@mui/base'
import * as React from 'react'

import { CodeCopyButton } from './CodeCopyButton'
import MarkdownElement from './MarkdownElement'
import { prismHighlight } from './prism'
import { useCodeCopy } from './utils'

export interface HighlightedCodeProps extends React.HTMLProps<'div'> {
  MarkdownComponent?: React.ElementType
  code: string
  copyButtonHidden?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  copyButtonProps: any
  language: string
}

export const HighlightedCode = React.forwardRef<HTMLDivElement, HighlightedCodeProps>((props, ref) => {
  const {
    copyButtonHidden = false, copyButtonProps, code, language, MarkdownComponent = MarkdownElement,
  } = props

  const renderedCode = React.useMemo(() => {
    return prismHighlight(code.trim(), language)
  }, [code, language])
  const {
    onBlur, onFocus, onMouseEnter, onMouseLeave,
  } = useCodeCopy()

  return (
    <MarkdownComponent ref={ref}>
      <div
        className="MuiCode-root"
        onBlur={onBlur}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onFocus={event => onFocus(event as any)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <pre>
          <code
            className={`language-${language}`}

            dangerouslySetInnerHTML={{ __html: renderedCode }}
          />
        </pre>
        {copyButtonHidden
          ? null
          : (
              <NoSsr>
                <CodeCopyButton code={code} {...copyButtonProps} />
              </NoSsr>
            )}
      </div>
    </MarkdownComponent>
  )
})

HighlightedCode.displayName = 'HighlightedCode'

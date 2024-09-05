import clipboardCopy from 'clipboard-copy'
import * as React from 'react'

export const useClipboardCopy = () => {
  const [isCopied, setIsCopied] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | undefined>()
  const mounted = React.useRef(false)

  React.useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const copy = async (text: string) => {
    try {
      setIsCopied(true)
      clearTimeout(timeout.current)
      timeout.current = setTimeout(() => {
        if (mounted) {
          setIsCopied(false)
        }
      }, 1200)
      await clipboardCopy(text)
    } catch {
      // ignore error
    }
  }

  return { copy, isCopied }
}

import * as React from 'react'
import { useRunner } from 'react-runner'

export interface ReactRunnerScope {
  import: Record<string, unknown>
  process: Record<string, unknown>
}

export interface ReactRunnerProps {
  code: string
  onError: (error: string | null) => void
  scope?: ReactRunnerScope
}

// The docs https://github.com/nihgwu/react-runner
export function ReactRunner(props: ReactRunnerProps) {
  const { code, scope: scopeProp, onError } = props

  let scope: ReactRunnerScope | undefined = scopeProp

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    scope = React.useMemo(() => {
      const handler = {
        get() {
          throw new Error(
            [
              'A demo tries to access process.x in ReactRunner. This is not supported.',
              'If you do not need to show the source, you can set "hideToolbar": true to solve the issue.',
            ].join('\n'),
          )
        },
      }

      return {
        import: {},
        process: scopeProp ? new Proxy(scopeProp.process, handler) : {},
        ...scopeProp,
      }
    }, [scopeProp])
  }

  const { element, error } = useRunner({
    code,
    scope,
  })

  React.useEffect(() => {
    onError(error)
  }, [error, onError])

  return element
}

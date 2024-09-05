import PropTypes from 'prop-types'
import * as React from 'react'

import type { CODE_VARIANT } from '../constants'
import { getCookie } from './getCookie'

interface CodeVariantContextProps {
  codeVariant: 'TS' | 'JS'
  noSsrCodeVariant?: string
  setCodeVariant: React.Dispatch<CODE_VARIANT>
}

const CodeVariantContext = React.createContext<CodeVariantContextProps>({
  codeVariant: 'TS',
  setCodeVariant: () => {
    return
  },
})

function useFirstRender() {
  const firstRenderRef = React.useRef(true)
  React.useEffect(() => {
    firstRenderRef.current = false
  }, [])

  return firstRenderRef.current
}

export const CodeVariantProvider = (props: React.ProviderProps<object>) => {
  const { children } = props

  const [codeVariant, setCodeVariant] = React.useState<CODE_VARIANT>('TS')

  const navigatedCodeVariant = React.useMemo(() => {
    const navigatedCodeVariantMatch = typeof window === 'undefined' ? null : window.location.hash.match(/\.(js|tsx)$/)

    if (navigatedCodeVariantMatch === null) {
      return
    }

    return navigatedCodeVariantMatch[1] === 'tsx' ? 'TS' : 'JS'
  }, [])

  const persistedCodeVariant = React.useMemo(() => {
    if (typeof window === 'undefined') {
      return
    }
    return getCookie('codeVariant') as CODE_VARIANT
  }, [])
  const isFirstRender = useFirstRender()

  // We initialize from navigation or cookies. on subsequent renders the store is the truth
  const noSsrCodeVariant = isFirstRender === true ? navigatedCodeVariant || persistedCodeVariant || codeVariant : codeVariant

  React.useEffect(() => {
    if (codeVariant !== noSsrCodeVariant) {
      setCodeVariant(noSsrCodeVariant)
    }
  }, [codeVariant, noSsrCodeVariant])

  React.useEffect(() => {
    document.cookie = `codeVariant=${codeVariant};path=/;max-age=31536000`
  }, [codeVariant])

  const contextValue = React.useMemo(() => {
    return {
      codeVariant, noSsrCodeVariant, setCodeVariant,
    }
  }, [codeVariant, noSsrCodeVariant])

  return <CodeVariantContext.Provider value={contextValue}>{children}</CodeVariantContext.Provider>
}

CodeVariantProvider.propTypes = { children: PropTypes.node.isRequired }

export function useCodeVariant() {
  return React.useContext(CodeVariantContext).codeVariant
}

export function useNoSsrCodeVariant() {
  return React.useContext(CodeVariantContext).noSsrCodeVariant
}

export function useSetCodeVariant() {
  return React.useContext(CodeVariantContext).setCodeVariant
}

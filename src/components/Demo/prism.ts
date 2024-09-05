/* eslint-disable import/no-named-as-default-member */
/* eslint-disable simple-import-sort/imports */
import type { Grammar } from 'prismjs'
import Prism from 'prismjs'

/* eslint-disable import/no-internal-modules */
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-diff'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-typescript'

import 'prismjs/themes/prism-okaidia.css'

export const prismHighlight = (code: string, language: string) => {
  let prismLanguage: Grammar
  switch (language) {
    case 'ts': {
      prismLanguage = Prism.languages.typescript
      break
    }

    case 'tsx': {
      prismLanguage = Prism.languages.tsx
      break
    }

    case 'js':
    case 'sh': {
      prismLanguage = Prism.languages.javascript
      break
    }

    case 'jsx': {
      prismLanguage = Prism.languages.jsx
      break
    }

    default: {
      prismLanguage = Prism.languages[language]
      break
    }
  }

  if (!prismLanguage) {
    if (language) {
      throw new Error(`unsupported language: "${language}", "${code}"`)
    } else {
      prismLanguage = Prism.languages.jsx
    }
  }

  const highlighted = Prism.highlight(code, prismLanguage, language)

  return highlighted
}

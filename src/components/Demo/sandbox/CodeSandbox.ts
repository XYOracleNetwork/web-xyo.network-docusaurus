import { compressToBase64 } from 'lz-string'

import { CODE_VARIANT } from '../constants'
import { addHiddenInput } from '../utils'
import * as CRA from './CreateReactApp'
import { getFileExtension } from './FileExtension'
import { DependenciesSet, getDependencies } from './getDependencies'

function compress(object: unknown) {
  return compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, '') // Remove ending '='
}

function openSandbox({
  files,
  codeVariant,
  initialFile = '/App',
}: {
  codeVariant: CODE_VARIANT
  files: Record<string, object>
  initialFile: string
}) {
  const extension = codeVariant === 'TS' ? '.tsx' : '.js'
  const parameters = compress({ files })

  // ref: https://codesandbox.io/docs/api/#define-api
  const form = document.createElement('form')
  form.method = 'POST'
  form.target = '_blank'
  form.action = 'https://codesandbox.io/api/v1/sandboxes/define'
  addHiddenInput(form, 'parameters', parameters)
  addHiddenInput(form, 'query', `file=${initialFile}${initialFile.match(/(\.tsx|\.ts|\.js)$/) ? '' : extension}`)
  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}

export const createCodeSandboxReactApp = (
  demo: {
    codeVariant: 'TS' | 'JS'
    githubLocation: string
    language: string
    product?: 'joy-ui' | 'base'
    raw?: string
    title: string
  },
  deps?: DependenciesSet[],
) => {
  const ext = getFileExtension(demo.codeVariant)
  const { title, githubLocation: description } = demo

  const files: Record<string, object> = {
    'public/index.html': {
      content: CRA.getHtml(demo),
    },
    [`index.${ext}`]: {
      content: CRA.getRootIndex(demo.product),
    },
    [`demo.${ext}`]: {
      content: demo.raw,
    },
    ...(demo.codeVariant === 'TS' && {
      'tsconfig.json': {
        content: CRA.getTsconfig(),
      },
    }),
  }

  const { dependencies, devDependencies } = getDependencies(demo.codeVariant === 'TS' ? [...(deps ?? []), 'typescript'] : [...(deps ?? [])])

  files['package.json'] = {
    content: {
      dependencies,
      description,
      devDependencies,
      ...(demo.codeVariant === 'TS' && {
        main: 'index.tsx',
        scripts: {
          start: 'react-scripts start',
        },
      }),
    },
  }

  return {
    dependencies,
    description,
    devDependencies,
    files,
    /**
     * @param {string} initialFile
     * @description should start with `/`, e.g. `/demo.tsx`. If the extension is not provided,
     * it will be appended based on the code variant.
     */
    openSandbox: (initialFile?: string) => (initialFile ? openSandbox({ codeVariant: demo.codeVariant, files, initialFile }) : null),

    title,
  }
}

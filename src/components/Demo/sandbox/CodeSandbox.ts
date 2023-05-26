import { compressToBase64 } from 'lz-string'

import { addHiddenInput } from '../utils'
import * as CRA from './CreateReactApp'
import { getFileExtension } from './FileExtension'
import { getDependencies } from './getDependencies'

function compress(object: any) {
  return compressToBase64(JSON.stringify(object))
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, '') // Remove ending '='
}

function openSandbox({ files, codeVariant, initialFile = '/App' }: any) {
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

export const createCodeSandboxReactApp = (demo: {
  codeVariant: 'TS' | 'JS'
  githubLocation: string
  language: string
  product?: 'joy-ui' | 'base'
  raw: string
  title: string
}) => {
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

  const { dependencies, devDependencies } = getDependencies(demo.codeVariant === 'TS')

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
    openSandbox: (initialFile?: string) => openSandbox({ codeVariant: demo.codeVariant, files, initialFile }),

    title,
  }
}

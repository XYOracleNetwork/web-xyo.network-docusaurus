import { addHiddenInput } from '../utils'
import * as CRA from './CreateReactApp'
import { getFileExtension } from './FileExtension'
import type { DependenciesSet } from './getDependencies'
import { getDependencies } from './getDependencies'

export const createStackBlitzReactApp = (
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

  const files: Record<string, string> = {
    'index.html': CRA.getHtml(demo),
    [`index.${ext}`]: CRA.getRootIndex(demo.product),
    [`demo.${ext}`]: demo.raw,
    ...(demo.codeVariant === 'TS' && { 'tsconfig.json': CRA.getTsconfig() }),
  }

  const { dependencies, devDependencies } = getDependencies(deps)

  files['package.json'] = JSON.stringify(
    {
      dependencies,
      description,
      devDependencies,
      ...(demo.codeVariant === 'TS' && {
        main: 'index.tsx',
        scripts: { start: 'react-scripts start' },
      }),
    },
    null,
    2,
  )

  return {
    dependencies,
    description,
    devDependencies,
    files,
    openSandbox: (initialFile = 'App') => {
      const extension = demo.codeVariant === 'TS' ? '.tsx' : '.ts'
      // ref: https://developer.stackblitz.com/docs/platform/post-api/
      const form = document.createElement('form')
      form.method = 'POST'
      form.target = '_blank'
      form.action = `https://stackblitz.com/run?file=${initialFile}${/(\.tsx|\.ts|\.js)$/.test(initialFile) ? '' : extension}`
      for (const [key, value] of Object.entries(files)) {
        addHiddenInput(form, `project[files][${key}]`, value)
      }
      addHiddenInput(form, 'project[template]', 'create-react-app')
      addHiddenInput(form, 'project[title]', title)
      addHiddenInput(form, 'project[description]', `# ${title}\n${description}`)
      addHiddenInput(form, 'project[dependencies]', JSON.stringify(dependencies))
      addHiddenInput(form, 'project[devDependencies]', JSON.stringify(devDependencies))
      document.body.append(form)
      form.submit()
      form.remove()
    },
    title,
  }
}

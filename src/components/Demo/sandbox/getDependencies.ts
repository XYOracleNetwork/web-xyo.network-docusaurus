const standardDependencies: Record<string, string> = {}

const typescriptDependencies: Record<string, string> = {}

const xyoDependencies: Record<string, string> = {
  '@xylabs/crypto': 'latest',
  '@xylabs/sdk-js': 'latest',
  '@xyo-network/sdk-xyo-client-js': 'latest',
}
const reactDevDependencies: Record<string, string> = {}

const xyoDevDependencies: Record<string, string> = {}

const muiDevDependencies: Record<string, string> = {}

const standardDevDependencies: Record<string, string> = {}

const typescriptDevDependencies: Record<string, string> = {
  typescript: 'latest',
}

const muiDependencies: Record<string, string> = {
  '@emotion/react': 'latest',
  '@emotion/styled': 'latest',
  '@mui/icons-material': 'latest',
  '@mui/material': 'latest',
}

const reactDependencies: Record<string, string> = {
  react: 'latest',
  'react-dom': 'latest',
}

const xyoReactDependencies: Record<string, string> = {
  '@xylabs/sdk-react': 'latest',
  '@xyo-network/sdk-xyo-react': 'latest',
  ...xyoDependencies,
  ...reactDependencies,
  ...muiDependencies,
}

const xyoReactDevDependencies: Record<string, string> = {
  ...xyoDevDependencies,
  ...reactDevDependencies,
  ...muiDevDependencies,
}

export type DependenciesSet = 'typescript' | 'xyo' | 'xyo_react' | 'mui' | 'react'

const DependenciesSets: Record<DependenciesSet, Record<string, string>> = {
  mui: muiDependencies,
  react: reactDependencies,
  typescript: typescriptDependencies,
  xyo: xyoDependencies,
  xyo_react: xyoReactDependencies,
}

const DevDependenciesSets: Record<DependenciesSet, Record<string, string>> = {
  mui: muiDevDependencies,
  react: reactDevDependencies,
  typescript: typescriptDevDependencies,
  xyo: xyoDevDependencies,
  xyo_react: xyoReactDevDependencies,
}

export const getDependencies = (sets: DependenciesSet[] = []) => {
  const dependencies = {
    ...standardDependencies,
    ...sets
      .map((set) => DependenciesSets[set])
      .reduce((prev, value) => {
        return { ...prev, ...value }
      }, {}),
  }

  const devDependencies = {
    ...standardDevDependencies,
    ...sets
      .map((set) => DevDependenciesSets[set])
      .reduce((prev, value) => {
        return { ...prev, ...value }
      }, {}),
  }

  return { dependencies, devDependencies }
}

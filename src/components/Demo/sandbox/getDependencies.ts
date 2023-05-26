const standardDependencies: Record<string, string> = {
  '@emotion/react': 'latest',
  '@emotion/styled': 'latest',
  '@mui/material': 'latest',
  react: 'latest',
  'react-dom': 'latest',
  typescript: 'latest',
}
const standardDevDependencies: Record<string, string> = {}
const typescriptDevDependencies: Record<string, string> = {
  typescript: 'latest',
}

export const getDependencies = (typescript = false) => {
  const dependencies = { ...standardDependencies }
  const devDependencies = { ...standardDevDependencies, ...(typescript ? typescriptDevDependencies : {}) }
  return { dependencies, devDependencies }
}

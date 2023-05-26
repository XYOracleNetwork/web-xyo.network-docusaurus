import { PointerHashMap } from './lib'

type KnownPluginPointers = keyof PointerHashMap

const MainApiRoot = 'https://api.archivist.xyo.network/'
const BetaApiRoot = 'https://beta.api.archivist.xyo.network/'

export const useFetchPointerHash = (plugin: KnownPluginPointers) => {
  const { hostname } = window.location

  if (hostname.startsWith('xyo.network')) {
    return `${MainApiRoot}${PointerHashMap[plugin]['main']}`
  }

  return `${BetaApiRoot}${PointerHashMap[plugin]['beta']}`
}

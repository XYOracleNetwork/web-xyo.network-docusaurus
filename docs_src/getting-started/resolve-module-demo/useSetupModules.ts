import { ArchivistInstance } from '@xyo-network/archivist-model'
import { useBuildSampleNode } from '@xyo-network/react-sample-node'
import { useEffect, useState } from 'react'

import { modules } from './lib'

export const useSetupModules = () => {
  const [archivist, setArchivist] = useState<ArchivistInstance>()
  // Build our Sample Node with modules including our Archivist
  const node = useBuildSampleNode(modules, 'https://beta.api.archivist.xyo.network')

  // Retrieve our Archivist from the Sample Node
  useEffect(() => {
    const resolveArchivist = async () => {
      try {
        const [resolvedModule] = (await node?.resolve({ name: [modules.MemoryArchivist ?? ''] })) ?? []
        if (resolvedModule) setArchivist(resolvedModule)
      } catch (e) {
        console.error('Error Resolving Archivist', e)
      }
    }
    resolveArchivist()
  }, [node])

  return { archivist, node }
}

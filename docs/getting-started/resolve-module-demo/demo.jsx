import { DeleteRounded, VisibilityRounded } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import { ArchivistCard } from '@xyo-network/react-archivist'
import { useBuildSampleNode } from '@xyo-network/react-node-renderer'
import React, { useEffect, useState } from 'react'

export const modules = {
  MemoryArchivist: 'MemoryArchivist',
  Node: 'SampleNode',
  SystemInfoWitness: 'SystemInfoWitness',
  // Bridge: "Bridge",
}

export const useSetupModules = () => {
  const [archivist, setArchivist] = useState()
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

export default function App() {
  const { archivist, node } = useSetupModules()
  const [all, setAll] = useState()

  const clearArchivist = async () => {
    if (archivist) {
      await archivist.clear()
      setAll(undefined)
    }
  }

  const insertIntoArchivist = async (payload) => {
    if (archivist) {
      await archivist.insert(payload)
      const all = await archivist.all()
      setAll(all)
    }
  }

  const witnessSystemInfo = async () => {
    if (node) {
      const moduleName = modules.SystemInfoWitness ?? ''
      // Retrieve the System Info Witness from our Sample Node
      const [systemInfoWitness] = await node.resolve({ name: [moduleName] })

      // Invoke the witness with .observe() to generate a payload containing the system info
      const result = await systemInfoWitness.observe()
      await insertIntoArchivist(result)
    }
  }

  return (
    <Box alignItems="stretch" gap="16px" display="flex" flexDirection="column">
      {archivist ? <ArchivistCard module={archivist} /> : null}
      <Box display="flex" gap="16px" justifyContent="space-between">
        <Button startIcon={<VisibilityRounded />} onClick={witnessSystemInfo} variant="contained">
          Witness System Information
        </Button>
        <Button color={'error'} onClick={clearArchivist} startIcon={<DeleteRounded />} variant={'contained'}>
          Clear Archivist
        </Button>
      </Box>
      {all?.length ? (
        <Card>
          <CardHeader title={'Archivist Payloads'} />
          <CardContent>
            {/* Raw output of the data saved to our Archivist */}
            <pre>{JSON.stringify(all, null, 2)}</pre>
          </CardContent>
        </Card>
      ) : null}
    </Box>
  )
}

import { DeleteRounded, VisibilityRounded } from '@mui/icons-material'
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import { ArchivistInstance, asArchivistInstance } from '@xyo-network/archivist-model'
import { Payload } from '@xyo-network/payload-model'
import { ArchivistCard } from '@xyo-network/react-archivist'
import { SampleNodeModules, useBuildSampleNode } from '@xyo-network/react-sample-node'
import React, { useEffect, useState } from 'react'
import { asWitnessInstance, WitnessInstance } from '@xyo-network/witness-model'

export const modules: SampleNodeModules = {
  MemoryArchivist: 'MemoryArchivist',
  Node: 'SampleNode',
  SystemInfoWitness: 'SystemInfoWitness',
  // Bridge: "Bridge",
}

export const useSetupModules = () => {
  const [archivist, setArchivist] = useState<ArchivistInstance>()
  // Build our Sample Node with modules including our Archivist
  const node = useBuildSampleNode(modules, 'https://beta.api.archivist.xyo.network')

  // Retrieve our Archivist from the Sample Node
  useEffect(() => {
    const resolveArchivist = async () => {
      try {
        const [resolvedModule] = (await node.deref()?.resolve({ name: [modules.MemoryArchivist ?? ''] })) ?? []
        const resolvedArchivist = asArchivistInstance<ArchivistInstance>(resolvedModule)
        if (resolvedArchivist) setArchivist(resolvedArchivist)
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
  const [all, setAll] = useState<Payload[]>()

  const clearArchivist = async () => {
    if (archivist) {
      await archivist.clear()
      setAll(undefined)
    }
  }

  const insertIntoArchivist = async (payload: Payload[]) => {
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
      const [resolvedModule] = await node.deref()?.resolve({ name: [moduleName] })
      const systemInfoWitness = asWitnessInstance<WitnessInstance>(resolvedModule)

      // Invoke the witness with .observe() to generate a payload containing the system info
      const result = await systemInfoWitness?.observe()
      await insertIntoArchivist(result)
    }
  }

  return (
    <Box alignItems="stretch" gap="16px" display="flex" flexDirection="column">
      {archivist ? <ArchivistCard mod={archivist} /> : null}
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

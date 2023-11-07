import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import { Box, Button, Card, CardContent, CardHeader } from '@mui/material'
import { XyoBowserSystemInfoWitness } from '@xyo-network/bowser-system-info-plugin'
import { Payload } from '@xyo-network/payload-model'
import { ArchivistCard } from '@xyo-network/react-archivist'
import React, { useState } from 'react'

import { modules } from './lib'
import { useSetupModules } from './useSetupModules'

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
      const [systemInfoWitness] = await node.resolve({ name: [moduleName] })

      // Invoke the witness with .observe() to generate a payload containing the system info
      const result = await (systemInfoWitness as XyoBowserSystemInfoWitness).observe()
      await insertIntoArchivist(result)
    }
  }

  return (
    <Box alignItems="stretch" gap="16px" display="flex" flexDirection="column">
      {module ? <ArchivistCard module={archivist} /> : null}
      <Box display="flex" gap="16px" justifyContent="space-between">
        <Button startIcon={<VisibilityRoundedIcon />} onClick={witnessSystemInfo} variant="contained">
          Witness System Information
        </Button>
        <Button color={'error'} onClick={clearArchivist} startIcon={<DeleteRoundedIcon />} variant={'contained'}>
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

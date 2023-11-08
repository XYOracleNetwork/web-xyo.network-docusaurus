import { Button, Stack } from '@mui/material'
import * as React from 'react'

// eslint-disable-next-line import/no-default-export
export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  )
}

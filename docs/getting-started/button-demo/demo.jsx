import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import * as React from 'react'

export default function BasicButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>
    </Stack>
  )
}

import Alert, { AlertProps } from '@mui/material/Alert'

export const DemoEditorError = (props: AlertProps) => {
  if (!props.children) {
    return null
  }

  return (
    <Alert
      aria-live="polite"
      variant="filled"
      severity="error"
      sx={{
        '& .MuiAlert-icon': {
          fontSize: 14,
          mr: 0.5,
          mt: 0.25,
          py: 0,
        },
        '& .MuiAlert-message': {
          fontSize: 12,
          py: 0,
        },
        left: '50%',
        position: 'absolute',
        px: '6px',
        py: '2px',
        top: 0,
        transform: 'translateX(-50%) translateY(-50%)',
      }}
      {...props}
    />
  )
}

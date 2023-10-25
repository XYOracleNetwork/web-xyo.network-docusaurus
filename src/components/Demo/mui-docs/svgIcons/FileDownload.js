import SvgIcon from '@mui/material/SvgIcon'
import * as React from 'react'

function FileDownload(props) {
  return (
    <SvgIcon {...props}>
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
    </SvgIcon>
  )
}

FileDownload.muiName = 'SvgIcon'

// eslint-disable-next-line import/no-default-export
export default FileDownload

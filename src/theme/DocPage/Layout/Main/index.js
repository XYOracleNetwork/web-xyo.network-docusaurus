// eslint-disable-next-line import/no-internal-modules
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
import { Typography, useTheme } from '@mui/material'
import { red } from '@mui/material/colors'
// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.css'
// eslint-disable-next-line import/no-default-export
export default function DocPageLayoutMain({ hiddenSidebarContainer, children }) {
  const sidebar = useDocsSidebar()
  const theme = useTheme()
  return (
    <main className={clsx(styles.docMainContainer, (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced)}>
      <div style={{ flexDirection: 'column' }}>
        <div style={{ backgroundColor: theme.palette.error.dark, padding: '10px' }}>
          <Typography fontWeight={700} color={theme.palette.error.light}>
            XYO Developer Documentation currently in Alpha Stage and is only for internal use.
          </Typography>
        </div>
        <div
          className={clsx(
            'container padding-top--md padding-bottom--lg',
            styles.docItemWrapper,
            hiddenSidebarContainer && styles.docItemWrapperEnhanced,
          )}
        >
          {children}
        </div>
      </div>
    </main>
  )
}

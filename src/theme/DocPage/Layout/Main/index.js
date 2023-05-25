// eslint-disable-next-line import/no-internal-modules
import { useDocsSidebar } from '@docusaurus/theme-common/internal'
// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.css'
// eslint-disable-next-line import/no-default-export
export default function DocPageLayoutMain({ hiddenSidebarContainer, children }) {
  const sidebar = useDocsSidebar()
  return (
    <main className={clsx(styles.docMainContainer, (hiddenSidebarContainer || !sidebar) && styles.docMainContainerEnhanced)}>
      <div
        className={clsx(
          'container padding-top--md padding-bottom--lg',
          styles.docItemWrapper,
          hiddenSidebarContainer && styles.docItemWrapperEnhanced,
        )}
      >
        {children}
      </div>
    </main>
  )
}

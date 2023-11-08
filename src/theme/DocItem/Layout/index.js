import { useWindowSize } from '@docusaurus/theme-common'
// eslint-disable-next-line import/no-internal-modules
import { useDoc } from '@docusaurus/theme-common/internal'
import DocBreadcrumbs from '@theme/DocBreadcrumbs'
import DocItemContent from '@theme/DocItem/Content'
import DocItemFooter from '@theme/DocItem/Footer'
import DocItemPaginator from '@theme/DocItem/Paginator'
import DocItemTOCDesktop from '@theme/DocItem/TOC/Desktop'
import DocItemTOCMobile from '@theme/DocItem/TOC/Mobile'
import DocVersionBadge from '@theme/DocVersionBadge'
import DocVersionBanner from '@theme/DocVersionBanner'
// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx'
import React from 'react'

import styles from './styles.module.css'
/**
 * Decide if the toc should be rendered, on mobile or desktop viewports
 */
function useDocTOC() {
  const { frontMatter, toc } = useDoc()
  const windowSize = useWindowSize()
  const hidden = frontMatter.hide_table_of_contents
  const canRender = !hidden && toc.length > 0
  const mobile = canRender ? <DocItemTOCMobile /> : undefined
  const desktop = canRender && (windowSize === 'desktop' || windowSize === 'ssr') ? <DocItemTOCDesktop /> : undefined
  return {
    desktop,
    hidden,
    mobile,
  }
}
// eslint-disable-next-line import/no-default-export
export default function DocItemLayout({ children }) {
  const docTOC = useDocTOC()
  return (
    <div className="row">
      <div className={clsx('col', 'arie', !docTOC.hidden && styles.docItemCol)}>
        <DocVersionBanner />
        <div className={styles.docItemContainer}>
          <article style={{ paddingRight: '80px' }}>
            <DocBreadcrumbs />
            <DocVersionBadge />
            {docTOC.mobile}
            <DocItemContent>{children}</DocItemContent>
            <DocItemFooter />
          </article>
          <DocItemPaginator />
        </div>
      </div>
      {docTOC.desktop && <div className="col col--2">{docTOC.desktop}</div>}
    </div>
  )
}

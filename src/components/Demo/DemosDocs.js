import PropTypes from 'prop-types'
import * as React from 'react'

import MarkdownElement from './MarkdownElement'

export default function DemosDocs(props) {
  const { WrapperComponent: Wrapper, wrapperProps, rendered = [], ...rest } = props
  return (
    <React.Fragment key="demos-docs">
      {rendered.map((renderedMarkdownOrDemo, index) => {
        return (
          <MarkdownElement
            renderedMarkdownOrDemo={renderedMarkdownOrDemo}
            WrapperComponent={Wrapper}
            wrapperProps={{ ...wrapperProps, key: `demos-docs-${index}` }}
            {...rest}
          />
        )
      })}
    </React.Fragment>
  )
}

DemosDocs.propTypes = {
  WrapperComponent: PropTypes.node,
  rendered: PropTypes.array,
  wrapperProps: PropTypes.object,
}

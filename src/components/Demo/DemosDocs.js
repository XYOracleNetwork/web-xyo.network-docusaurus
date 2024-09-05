import PropTypes from 'prop-types'
import * as React from 'react'

import MarkdownElement from './MarkdownElement'

// eslint-disable-next-line import/no-default-export
export default function DemosDocs(props) {
  const {
    WrapperComponent: Wrapper, wrapperProps, rendered = [], ...rest
  } = props
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
  // eslint-disable-next-line import/no-named-as-default-member
  WrapperComponent: PropTypes.node,
  // eslint-disable-next-line import/no-named-as-default-member
  rendered: PropTypes.array,
  // eslint-disable-next-line import/no-named-as-default-member
  wrapperProps: PropTypes.object,
}

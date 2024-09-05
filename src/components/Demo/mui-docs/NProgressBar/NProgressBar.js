import * as NoSsr from '@mui/base/NoSsr'
import GlobalStyles from '@mui/material/GlobalStyles'
import { keyframes } from '@mui/material/styles'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import * as React from 'react'

NProgress.configure({
  barSelector: '.nprogress-bar',
  template: `
    <div class="nprogress-bar">
      <div></div>
      <div></div>
    </div>
  `,
})

const muiNProgressPulse = keyframes`
  30% {
    opacity: 0.6;
  }

  60% {
    opacity: 0;
  }

  to {
    opacity: 0.6;
  }
`

/**
 * Elegant and ready-to-use wrapper on top of https://github.com/rstacruz/nprogress/.
 * The implementation is highly inspired by the YouTube one.
 */
export function NProgressBar(props) {
  return (
    <NoSsr>
      {props.children}
      <GlobalStyles
        styles={theme => ({
          '#nprogress': {
            'backgroundColor': (theme.vars || theme).palette.primary[200],
            'direction': 'ltr',
            'height': 2,
            'left': 0,
            'pointerEvents': 'none',
            'position': 'fixed',
            'right': 0,
            'top': 0,
            'zIndex': (theme.vars || theme).zIndex.tooltip,
            ...theme.applyDarkStyles({ backgroundColor: (theme.vars || theme).palette.primary[700] }),
            '& .nprogress-bar': {
              backgroundColor: (theme.vars || theme).palette.primary.main,
              height: 2,
              left: 0,
              position: 'fixed',
              right: 0,
              top: 0,
            },
            '& .nprogress-bar > div': {
              animation: `${muiNProgressPulse} 2s ease-out 0s infinite`,
              borderRadius: '100%',
              boxShadow: `${(theme.vars || theme).palette.primary.main} 1px 0 6px 1px`,
              height: 2,
              position: 'absolute',
              top: 0,
            },
            '& .nprogress-bar > div:first-of-type': {
              clip: 'rect(-6px,22px,14px,10px)',
              opacity: 0.6,
              right: 0,
              width: 20,
            },
            '& .nprogress-bar > div:last-of-type': {
              clip: 'rect(-6px,90px,14px,-6px)',
              opacity: 0.6,
              right: -80,
              width: 180,
            },
          },
        })}
      />
    </NoSsr>
  )
}

NProgressBar.propTypes = {
  // eslint-disable-next-line import/no-named-as-default-member
  children: PropTypes.node,
}

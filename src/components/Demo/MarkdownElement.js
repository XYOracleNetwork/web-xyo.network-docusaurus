/* eslint-disable max-lines */
import { alpha, darken, styled } from '@mui/material/styles'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import * as React from 'react'

import { brandingDarkTheme as darkTheme, brandingLightTheme as lightTheme } from './brandingTheme'

const Root = styled('div')(
  ({ theme }) => ({
    ...lightTheme.typography.body1,

    '& .MuiCallout-root': {
      '& > p, & ul, li': {
        color: 'inherit',
      },
      '& > ul, & > p': {
        '&:last-child': {
          margin: 0,
        },
      },
      '&.MuiCallout-error': {
        '& a': {
          '&:hover': {
            textDecorationColor: 'inherit',
          },
          color: `var(--muidocs-palette-error-800, ${lightTheme.palette.error[800]})`,
          textDecorationColor: alpha(lightTheme.palette.error.main, 0.4),
        },
        '& strong': {
          color: `var(--muidocs-palette-error-800, ${lightTheme.palette.error[800]})`,
        },
        backgroundColor: `var(--muidocs-palette-error-50, ${lightTheme.palette.error[50]})`,
        borderColor: `var(--muidocs-palette-error-100, ${lightTheme.palette.error[100]})`,
        color: `var(--muidocs-palette-error-900, ${lightTheme.palette.error[900]})`,
      },
      '&.MuiCallout-info': {
        '& strong': {
          color: `var(--muidocs-palette-primary-800, ${lightTheme.palette.primary[800]})`,
        },
        backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
        borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
        color: `var(--muidocs-palette-primary-900, ${lightTheme.palette.primary[900]})`,
      },
      '&.MuiCallout-success': {
        '& a': {
          '&:hover': {
            textDecorationColor: 'inherit',
          },
          color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
          textDecorationColor: alpha(lightTheme.palette.success.main, 0.4),
        },
        '& strong': {
          color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
        },
        backgroundColor: `var(--muidocs-palette-success-50, ${lightTheme.palette.success[50]})`,
        borderColor: `var(--muidocs-palette-success-200, ${lightTheme.palette.success[200]})`,
        color: `var(--muidocs-palette-success-900, ${lightTheme.palette.success[900]})`,
      },
      '&.MuiCallout-warning': {
        '& a': {
          '&:hover': {
            textDecorationColor: 'inherit',
          },
          color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
          textDecorationColor: alpha(lightTheme.palette.warning.main, 0.4),
        },
        '& strong': {
          color: `var(--muidocs-palette-warning-800, ${lightTheme.palette.warning[800]})`,
        },
        backgroundColor: alpha(lightTheme.palette.warning[50], 0.5),
        borderColor: alpha(lightTheme.palette.warning[600], 0.3),
        color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      },
      border: '1px solid',
      borderRadius: `var(--muidocs-shape-borderRadius, ${theme.shape?.borderRadius ?? lightTheme.shape.borderRadius}px)`,
      margin: '16px 0',
      padding: '16px',
    },

    '& .MuiCode-copy': {
      '& .MuiCode-copyKeypress': {
        display: 'none',
      },
      '&:focus-visible': {
        outline: '2px solid',
        outlineColor: lightTheme.palette.primaryDark[500],
        outlineOffset: 2,
      },
      '&:hover, &:focus': {
        '& .MuiCode-copyKeypress': {
          // Approximate no hover capabilities with no keyboard
          // https://github.com/w3c/csswg-drafts/issues/3871
          '@media (any-hover: none)': {
            display: 'none',
          },

          display: 'block',
        },
        backgroundColor: alpha(lightTheme.palette.primaryDark[600], 0.7),
        borderColor: lightTheme.palette.primaryDark[500],
        color: '#fff',
        opacity: 1,
      },
      '&[data-copied]': {
        backgroundColor: lightTheme.palette.primaryDark[600],
        // style of the button when it is in copied state.
        borderColor: lightTheme.palette.primary[700],
        color: '#fff',
      },
      backgroundColor: alpha(lightTheme.palette.primaryDark[600], 0.5),
      border: '1px solid',
      borderColor: lightTheme.palette.primaryDark[500],
      borderRadius: 4,
      color: lightTheme.palette.primaryDark[50],
      cursor: 'pointer',
      display: 'none',
      fontFamily: 'inherit',
      fontSize: lightTheme.typography.pxToRem(13),
      fontWeight: 500,
      minWidth: 64,
      padding: theme.spacing(0.5, 1),
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },

    '& .MuiCode-copyKeypress': {
      '& > span': {
        opacity: 0.72,
      },
      left: '50%',
      marginTop: theme.spacing(0.5),
      minWidth: '100%',
      pointerEvents: 'none',
      position: 'absolute',
      top: '100%',
      transform: 'translateX(-50%)',
      userSelect: 'none',
      whiteSpace: 'nowrap',
    },

    '& .MuiCode-root': {
      '&:hover': {
        '& .MuiCode-copy': {
          display: 'block',
        },
      },

      direction: 'ltr /*! @noflip */',

      // Font size reset to fix a bug with Safari 16.0 when letterSpacing is set
      fontSize: 10,
      position: 'relative',
    },

    '& .component-tabs': {
      margin: '0 0 40px',
    },

    '& .description': {
      ...lightTheme.typography.subtitle1,
      fontWeight: 400,
      margin: '0 0 28px',
    },

    // inline code block
    '& :not(pre) > code': {
      backgroundColor: alpha(lightTheme.palette.primary.light, 0.15),
      borderRadius: 5,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      direction: 'ltr /*! @noflip */',
      display: 'inline-block',
      fontSize: lightTheme.typography.pxToRem(13),
      padding: '0 5px',
    },

    '& a code': {
      color: darken(lightTheme.palette.primary.main, 0.04),
    },

    '& a, & a code': {
      '&:hover': {
        textDecorationColor: 'inherit',
      },
      // Style taken from the Link component
      color: `var(--muidocs-palette-primary-600, ${lightTheme.palette.primary[600]})`,
      textDecoration: 'underline',
      textDecorationColor: alpha(lightTheme.palette.primary.main, 0.4),
    },

    '& blockquote': {
      '& p': {
        color: `var(--muidocs-palette-primaryDark-800, ${lightTheme.palette.primaryDark[800]})`,
        marginTop: 10,
      },
      backgroundColor: `var(--muidocs-palette-warning-50, ${lightTheme.palette.warning[50]})`,
      border: '1px solid',
      borderColor: `var(--muidocs-palette-warning-300, ${lightTheme.palette.warning[300]})`,
      borderLeft: '8px solid',
      borderRadius: `var(--muidocs-shape-borderRadius, ${theme.shape?.borderRadius ?? lightTheme.shape.borderRadius}px)`,
      margin: '20px 0',
      padding: '10px 20px',
    },

    '& code': {
      ...lightTheme.typography.body2,
      WebkitFontSmoothing: 'subpixel-antialiased',
      fontFamily: lightTheme.typography.fontFamilyCode,
      fontWeight: 400,
    },

    '& details': {
      '& pre': {
        marginTop: theme.spacing(1),
      },
      marginBottom: theme.spacing(1.5),
      padding: theme.spacing(0.5, 0, 0.5, 1),
    },

    '& h1': {
      ...lightTheme.typography.h3,
      color: `var(--muidocs-palette-primaryDark-900, ${lightTheme.palette.primaryDark[900]})`,
      fontFamily: `"PlusJakartaSans-ExtraBold", ${lightTheme.typography.fontFamilySystem}`,
      fontSize: lightTheme.typography.pxToRem(36),
      fontWeight: 800,
      margin: '10px 0',
    },

    '& h1 code': {
      fontWeight: lightTheme.typography.fontWeightSemiBold,
    },

    '& h1 code, & h2 code, & h3 code': {
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
    },

    '& h1, & h2, & h3, & h4': {
      '& .anchor-link': {
        // To prevent the link to get the focus.
        display: 'none',
      },

      '& .comment-link': {
        '& svg': {
          verticalAlign: 'middle',
        },
        '&:hover': {
          opacity: 1,
        },

        display: 'none',

        opacity: 0.5,

        right: 0,
        // So we can have the comment button opt-in.
        top: 0,
        transition: theme.transitions.create('opacity', {
          duration: theme.transitions.duration.shortest,
        }),
      },

      '& a:not(.anchor-link):hover': {
        borderBottom: '1px solid currentColor',
        color: 'currentColor',
        textDecoration: 'none',
      },

      '& code': {
        fontSize: 'inherit',
        lineHeight: 'inherit',
        // Remove scroll on small screens.
        wordBreak: 'break-all',
      },

      '&:hover .anchor-link, & .comment-link': {
        '& svg': {
          fill: 'currentColor',
          height: '0.875rem',
          pointerEvents: 'none',
          width: '0.875rem',
        },
        '&:hover': {
          color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
        },
        backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
        border: '1px solid',
        borderColor: `var(--muidocs-palette-grey-200, ${lightTheme.palette.grey[200]})`,
        borderRadius: 8,
        color: `var(--muidocs-palette-text-secondary, ${lightTheme.palette.text.secondary})`,
        cursor: 'pointer',
        display: 'inline-block',
        height: 26,
        lineHeight: '21.5px',
        marginLeft: 10,
        marginTop: 5,
        position: 'absolute',
        textAlign: 'center',
        width: 26,
      },
      // Reserve space for the end of the line action button
      paddingRight: 26 * 2 + 10,
      position: 'relative',
    },

    '& h2': {
      ...lightTheme.typography.h5,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      fontFamily: lightTheme.typography.fontFamilySystem,
      fontWeight: 700,
      margin: '40px 0 4px',
    },

    '& h2 code': {
      fontSize: lightTheme.typography.pxToRem(24),
      fontWeight: lightTheme.typography.fontWeightSemiBold,
    },

    '& h3': {
      ...lightTheme.typography.h6,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      fontFamily: lightTheme.typography.fontFamilySystem,
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      margin: '24px 0 8px',
    },

    '& h3 code': {
      fontSize: lightTheme.typography.pxToRem(18),
    },

    '& h4': {
      ...lightTheme.typography.subtitle1,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      fontFamily: lightTheme.typography.fontFamilySystem,
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      margin: '24px 0 8px',
    },

    '& h5': {
      ...lightTheme.typography.subtitle2,
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      fontWeight: lightTheme.typography.fontWeightSemiBold,
      margin: '20px 0 8px',
    },

    '& hr': {
      backgroundColor: `var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      border: 0,
      flexShrink: 0,
      height: 1,
      margin: theme.spacing(5, 0),
    },

    '& img': {
      // Avoid very sharp edges
      borderRadius: 2,

      // Avoid layout jump
      display: 'inline-block',
    },

    '& img, & video': {
      // Avoid the image to be fixed height, so it can respect the aspect ratio.
      height: 'auto',

      // Use !important so that inline style on <img> or <video> can't win.
      // This avoid horizontal overflows on mobile.
      maxWidth: '100% !important',
    },

    '& kbd.key': {
      backgroundColor: `var(--muidocs-palette-grey-50, ${lightTheme.palette.grey[50]})`,
      border: `1px solid var(--muidocs-palette-grey-300, ${lightTheme.palette.grey[300]})`,
      borderRadius: 5,
      boxShadow: `inset 0 -1px 0 var(--muidocs-palette-grey-300, ${lightTheme.palette.grey[300]})`,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      display: 'inline-block',
      font: '11px Consolas,Liberation Mono,Menlo,monospace',
      lineHeight: '10px',
      margin: '0 1px',
      padding: '5px',
      verticalAlign: 'middle',
      whiteSpace: 'nowrap',
    },

    '& li': {
      // loose lists https://spec.commonmark.org/0.30/#loose
      '& > p': {
        marginBottom: theme.spacing(1),
      },

      '& pre': {
        marginTop: theme.spacing(1),
      },

      // tight lists https://spec.commonmark.org/0.30/#tight
      marginBottom: 4,
    },

    '& p, & ul, & ol': {
      color: `var(--muidocs-palette-grey-900, ${lightTheme.palette.grey[900]})`,
      marginBottom: 16,
      marginTop: 0,
    },

    '& pre': {
      WebkitOverflowScrolling: 'touch',
      backgroundColor: `var(--muidocs-palette-primaryDark-800, ${lightTheme.palette.primaryDark[800]})`,

      border: '1px solid',

      borderColor: `var(--muidocs-palette-primaryDark-700, ${lightTheme.palette.primaryDark[700]})`,

      borderRadius: `var(--muidocs-shape-borderRadius, ${theme.shape?.borderRadius ?? lightTheme.shape.borderRadius}px)`,

      color: '#f8f8f2',

      colorScheme: 'dark',

      fontSize: lightTheme.typography.pxToRem(13),

      lineHeight: 1.5,
      // Developers likes when the code is dense.
      margin: theme.spacing(2, 'auto'),
      maxHeight: '400px',
      maxWidth: 'calc(100vw - 32px)',
      overflow: 'auto',
      padding: theme.spacing(2),
      [lightTheme.breakpoints.up('md')]: {
        maxWidth: 'calc(100vw - 32px - 16px)',
      },
    },

    '& pre > code': {
      // Reset for Safari
      // https://github.com/necolas/normalize.css/blob/master/normalize.css#L102
      fontSize: 'inherit',
    },

    '& strong': {
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
    },

    '& summary': {
      cursor: 'pointer',
    },

    '& table': {
      '& .optional': {
        color: '#45529f',
      },

      '& .prop-default, & .slot-default': {
        borderBottom: `1px dotted var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      },

      '& .prop-name, & .prop-type, & .prop-default, & .slot-name, & .slot-defaultClass, & .slot-default': {
        WebkitFontSmoothing: 'subpixel-antialiased',
        fontFamily: lightTheme.typography.fontFamilyCode,
        fontSize: lightTheme.typography.pxToRem(13),
        fontWeight: 400,
      },

      '& .prop-type, & .slot-defaultClass': {
        color: '#932981',
      },

      '& .required': {
        color: '#006500',
      },

      WebkitOverflowScrolling: 'touch',

      borderCollapse: 'collapse',

      borderSpacing: 0,
      // Trade display table for scroll overflow
      display: 'block',
      marginBottom: '20px',
      overflowX: 'auto',
      wordBreak: 'normal',
    },

    '& td': {
      ...theme.typography.body2,
      borderBottom: `1px solid var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      color: `var(--muidocs-palette-text-secondary, ${lightTheme.palette.text.secondary})`,
      paddingBottom: 12,
      paddingRight: 20,
      paddingTop: 12,
    },

    '& td code': {
      lineHeight: 1.6,
    },

    '& th': {
      borderBottom: `1px solid var(--muidocs-palette-divider, ${lightTheme.palette.divider})`,
      color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
      fontSize: theme.typography.pxToRem(14),
      fontWeight: 500,
      lineHeight: theme.typography.pxToRem(24),
      paddingBottom: 12,
      paddingRight: 20,
      paddingTop: 12,
      whiteSpace: 'pre',
    },

    '& ul': {
      paddingLeft: 30,
    },
    // Increased compared to the 1.5 default to make the docs easier to read.
    color: `var(--muidocs-palette-text-primary, ${lightTheme.palette.text.primary})`,
    lineHeight: 1.5625,
    wordBreak: 'break-word',
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .MuiCallout-root': {
        '&.MuiCallout-error': {
          '& a': {
            color: `var(--muidocs-palette-error-200, ${darkTheme.palette.error[200]})`,
          },
          '& strong': {
            color: `var(--muidocs-palette-error-100, ${darkTheme.palette.error[100]})`,
          },
          backgroundColor: alpha(darkTheme.palette.error[700], 0.15),
          borderColor: alpha(lightTheme.palette.error[600], 0.3),
          color: `var(--muidocs-palette-error-50, ${darkTheme.palette.error[50]})`,
        },
        '&.MuiCallout-info': {
          '& strong': {
            color: `var(--muidocs-palette-primary-200, ${darkTheme.palette.primary[200]})`,
          },
          backgroundColor: alpha(darkTheme.palette.grey[700], 0.2),
          borderColor: `var(--muidocs-palette-primary-800, ${darkTheme.palette.grey[800]})`,
          color: `var(--muidocs-palette-primary-50, ${darkTheme.palette.primary[50]})`,
        },
        '&.MuiCallout-success': {
          '& a': {
            color: `var(--muidocs-palette-success-100, ${darkTheme.palette.success[100]})`,
          },
          '& strong': {
            color: `var(--muidocs-palette-success-200, ${darkTheme.palette.success[200]})`,
          },
          backgroundColor: alpha(darkTheme.palette.success[700], 0.15),
          borderColor: alpha(lightTheme.palette.success[600], 0.3),
          color: `var(--muidocs-palette-success-50, ${darkTheme.palette.success[50]})`,
        },
        '&.MuiCallout-warning': {
          '& a': {
            color: `var(--muidocs-palette-warning-100, ${darkTheme.palette.warning[100]})`,
          },
          '& strong': {
            color: `var(--muidocs-palette-warning-200, ${darkTheme.palette.warning[200]})`,
          },
          backgroundColor: alpha(darkTheme.palette.warning[700], 0.15),
          borderColor: alpha(darkTheme.palette.warning[600], 0.3),
          color: `var(--muidocs-palette-warning-50, ${darkTheme.palette.warning[50]})`,
        },
      },
      '& :not(pre) > code': {
        // inline code block
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
      },
      '& a code': {
        color: `var(--muidocs-palette-primary-light, ${darkTheme.palette.primary.light})`,
      },
      '& a, & a code': {
        color: `var(--muidocs-palette-primary-300, ${darkTheme.palette.primary[300]})`,
      },
      '& blockquote': {
        '& p': {
          color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
        },
        backgroundColor: alpha(darkTheme.palette.warning[900], 0.2),
        borderColor: `var(--muidocs-palette-warning-500, ${darkTheme.palette.warning[500]})`,
      },
      '& h1': {
        color: `var(--muidocs-palette-grey-50, ${darkTheme.palette.grey[50]})`,
      },
      '& h1 code, & h2 code, & h3 code': {
        color: `var(--muidocs-palette-grey-100, ${darkTheme.palette.grey[100]})`,
      },
      '& h1, & h2, & h3, & h4': {
        '&:hover .anchor-link, & .comment-link': {
          '&:hover': {
            color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
          },
          backgroundColor: alpha(darkTheme.palette.primaryDark[800], 0.3),
          borderColor: `var(--muidocs-palette-primaryDark-500, ${darkTheme.palette.primaryDark[500]})`,
          color: `var(--muidocs-palette-text-secondary, ${darkTheme.palette.text.secondary})`,
        },
      },
      '& h2': {
        color: `var(--muidocs-palette-grey-100, ${darkTheme.palette.grey[100]})`,
      },
      '& h3': {
        color: `var(--muidocs-palette-grey-200, ${darkTheme.palette.grey[200]})`,
      },
      '& h4': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
      },
      '& h5': {
        color: `var(--muidocs-palette-grey-300, ${darkTheme.palette.grey[300]})`,
      },
      '& hr': {
        backgroundColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
      },
      '& kbd.key': {
        backgroundColor: `var(--muidocs-palette-primaryDark-900, ${darkTheme.palette.primaryDark[900]})`,
        border: `1px solid var(--muidocs-palette-primaryDark-500, ${darkTheme.palette.primaryDark[500]})`,
        boxShadow: `inset 0 -1px 0 var(--muidocs-palette-primaryDark-700, ${darkTheme.palette.primaryDark[700]})`,
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
      },
      '& p, & ul, & ol': {
        color: `var(--muidocs-palette-grey-400, ${darkTheme.palette.grey[400]})`,
      },
      '& strong': {
        color: `var(--muidocs-palette-grey-200, ${darkTheme.palette.grey[200]})`,
      },
      '& table': {
        '& .optional': {
          color: '#a5b3ff',
        },
        '& .prop-default, & .slot-default': {
          borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        },
        '& .prop-type, & .slot-defaultClass': {
          color: '#ffb6ec',
        },
        '& .required': {
          color: '#a5ffa5',
        },
      },
      '& td': {
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        color: `var(--muidocs-palette-text-secondary, ${darkTheme.palette.text.secondary})`,
      },
      '& th': {
        borderColor: `var(--muidocs-palette-divider, ${darkTheme.palette.divider})`,
        color: `var(--muidocs-palette-text-primary, ${darkTheme.palette.text.primary})`,
      },
      color: 'rgb(255, 255, 255)',
    },
  }),
)

const MarkdownElement = React.forwardRef(function MarkdownElement(props, ref) {
  const { className, renderedMarkdown, ...other } = props
  const more = {}

  if (typeof renderedMarkdown === 'string') {
    // workaround for https://github.com/facebook/react/issues/17170
    // otherwise we could just set `dangerouslySetInnerHTML={undefined}`
    more.dangerouslySetInnerHTML = { __html: renderedMarkdown }
  }

  return <Root className={clsx('markdown-body', className)} {...more} {...other} ref={ref} />
})

MarkdownElement.propTypes = {
  className: PropTypes.string,
  renderedMarkdown: PropTypes.string,
}

export default MarkdownElement

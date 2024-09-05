/* eslint-disable max-lines */
/* eslint-disable complexity */
import ArrowDropDownRounded from '@mui/icons-material/ArrowDropDownRounded'
import type { Theme, ThemeOptions } from '@mui/material/styles'
import { alpha, createTheme } from '@mui/material/styles'
import type {} from '@mui/material/themeCssVarsAugmentation'
import type { CSSObject } from '@mui/system'

interface ApplyDarkStyles {
  (scheme: CSSObject): CSSObject
}

// TODO: enable this once types conflict is fixed
// declare module '@mui/material/Button' {
//   interface ButtonPropsVariantOverrides {
//     code: true;
//   }
// }

const defaultTheme = createTheme()

export const blue = {
  100: '#C2E0FF',
  200: '#99CCF3',
  300: '#66B2FF',
  400: '#3399FF',
  50: '#F0F7FF',
  500: '#007FFF',
  600: '#0072E5',
  // vs blueDark 900: WCAG 4.6 AAA (large), APCA 36 Not for reading text
  700: '#0059B2',
  800: '#004C99',
  900: '#003A75',
  main: '#007FFF',
}
export const blueDark = {
  100: '#CEE0F3',
  200: '#91B9E3',
  300: '#5090D3',
  400: '#265D97',
  50: '#E2EDF8',
  500: '#1E4976',
  600: '#173A5E',
  700: '#132F4C',
  // contrast 13.64:1
  800: '#001E3C',
  900: '#0A1929',
  main: '#5090D3',
}
export const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  // vs blueDark 900: WCAG 11.6 AAA, APCA 78 Best for text
  400: '#B2BAC2',
  50: '#F3F6F9', // vs blueDark 900: WCAG 9 AAA, APCA 63.3 Ok for text
  500: '#A0AAB4', // vs blueDark 900: WCAG 7.5 AAA, APCA 54.3 Only for large text
  600: '#6F7E8C', // vs white bg: WCAG 4.1 AA, APCA 68.7 Ok for text
  700: '#3E5060', // vs white bg: WCAG 8.3 AAA, APCA 88.7 Best for text
  800: '#2D3843', // vs white bg: WCAG 11.9 AAA, APCA 97.3 Best for text
  900: '#1A2027',
}
export const error = {
  100: '#FFDBDE',
  200: '#FFBDC2',
  300: '#FF99A2',
  400: '#FF7A86',
  50: '#FFF0F1',
  500: '#FF505F',
  // contrast 4.63:1
  600: '#EB0014',
  700: '#C70011',
  800: '#94000D',
  900: '#570007',
  main: '#EB0014',
}
export const success = {
  100: '#C6F6D9',
  200: '#9AEFBC',
  300: '#6AE79C',
  400: '#3EE07F',
  50: '#E9FBF0',
  500: '#21CC66',
  600: '#1DB45A',
  700: '#1AA251',
  800: '#178D46',
  900: '#0F5C2E',
}
export const warning = {
  100: '#FFF3C1',
  200: '#FFECA1',
  300: '#FFDC48',
  // vs blueDark900: WCAG 10.4 AAA, APCA 72 Ok for text
  400: '#F4C000',
  50: '#FFF9EB', // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
  500: '#DEA500',
  600: '#D18E00',

  // vs blueDark900: WCAG 6.4 AA normal, APCA 48 Only large text
  700: '#AB6800',

  // vs white bg: WCAG 4.4 AA large, APCA 71 Ok for text
  800: '#8C5800',

  // vs white bg: WCAG 5.9 AAA large, APCA 80 Best for text
  900: '#5A3600',
  // vs blueDark900: WCAG 8 AAA normal, APCA 58 Only large text
  main: '#DEA500', // vs white bg: WCAG 10.7 AAA, APCA 95 Best for text
}
// context on the Advanced Perceptual Contrast Algorithm (APCA) used above here: https://github.com/w3c/wcag/issues/695

const systemFont = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
]

export const getMetaThemeColor = (mode: 'light' | 'dark') => {
  const themeColor = {
    dark: blueDark[800],
    light: grey[50],
  }
  return themeColor[mode]
}

export const getDesignTokens = (mode: 'light' | 'dark') =>
  ({
    /**
     * This utility exists to help transitioning to CSS variables page by page (prevent dark mode flicker).
     * It will use the proper styling method based on the theme because the component might be on the page that does not support CSS variables yet.
     *
     * 😓 Without this utility:
     * {
     *   ...theme.vars ? {
     *     color: theme.vars.palette.primary.main,
     *     [theme.getColorScheme('dark')]: {
     *       color: '#fff',
     *     }
     *   } : {
     *     color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
     *   }
     * }
     *
     * 🤩 Using the utility:
     * {
     *   color: (theme.vars || theme).palette.primary.main,
     *   ...theme.applyDarkStyles({
     *     color: '#fff',
     *   }),
     * }
     *
     * -------------------------------------------------------------------------------------------------
     * 💡 This util should be used in an array if the styles contain pseudo classes or nested selectors:
     *
     * ❌ There is a chance that the upper selectors could be overridden
     * {
     *    // the whole selector could be overridden
     *   '&::before': {
     *     color: ...
     *   },
     *   ...theme.applyDarkStyles({
     *      '&::before': {
     *        color: ...
     *      }
     *   })
     * }
     *
     * ✅ use an array (supports in both emotion and styled-components)
     * Only the `color` will be overridden in dark mode.
     *  [
     *    '&::before': {
     *      color: ...
     *    },
     *    theme.applyDarkStyles({
     *      '&::before': {
     *        color: ...
     *      }
     *    })
     *  ]
     */
    applyDarkStyles(css: Parameters<ApplyDarkStyles>[0]) {
      if ((this as Theme).vars) {
        // If CssVarsProvider is used as a provider,
        // returns ':where([data-mui-color-scheme="light|dark"]) &'
        const selector = (this as Theme).getColorSchemeSelector('dark').replace(/(\[[^\]]+])/, ':where($1)')
        return { [selector]: css }
      }
      if ((this as Theme).palette.mode === 'dark') {
        return css
      }

      return
    },
    palette: {
      divider: mode === 'dark' ? alpha(blue[100], 0.08) : grey[100],
      mode,
      primary: {
        ...blue,
        ...(mode === 'dark' && { main: blue[400] }),
      },
      primaryDark: blueDark,
      ...(mode === 'dark' && {
        background: {
          default: blueDark[800],
          paper: blueDark[900],
        },
      }),
      common: { black: '#1D1D1D' },
      error,
      grey: {
        ...grey,
        ...(mode === 'light' && {
          contrastText: grey[600],
          main: grey[100],
        }),
        ...(mode === 'dark' && {
          contrastText: grey[600],
          main: blueDark[700],
        }),
      },
      success: {
        ...success,
        ...(mode === 'dark' && { main: '#1DB45A', // contrast 6.17:1 (blueDark.800)
        }),
        ...(mode === 'light' && { main: '#1AA251', // contrast 3.31:1
        }),
      },
      text: {
        ...(mode === 'light' && {
          primary: grey[900],
          secondary: grey[700],
        }),
        ...(mode === 'dark' && {
          primary: '#fff',
          secondary: grey[400],
        }),
      },
      warning,
    },

    shape: { borderRadius: 10 },

    spacing: 10,

    typography: {
      allVariants: { scrollMarginTop: 'calc(var(--MuiDocs-header-height) + 32px)' },

      body1: {
        fontSize: defaultTheme.typography.pxToRem(16),
        letterSpacing: 0,
        // 16px
        lineHeight: 24 / 16,
      },

      body2: {
        fontSize: defaultTheme.typography.pxToRem(14),
        letterSpacing: 0,
        // 14px
        lineHeight: 21 / 14,
      },

      button: {
        fontWeight: 700,
        letterSpacing: 0,
        textTransform: 'initial',
      },

      caption: {
        display: 'inline-block',
        fontSize: defaultTheme.typography.pxToRem(12),
        fontWeight: 700,

        letterSpacing: 0,
        // 12px
        lineHeight: 18 / 12,
      },

      fontFamily: ['"IBM Plex Sans"', ...systemFont].join(','),
      // Match VS Code
      // https://github.com/microsoft/vscode/blob/b38691f611d1ce3ef437c67a1b047c757b7b4e53/src/vs/editor/common/config/editorOptions.ts#L4578-L4580
      // https://github.com/microsoft/vscode/blob/d950552131d7350a45dac8b59bf179469c36c2ac/src/vs/editor/standalone/browser/standalone-tokens.css#L10
      fontFamilyCode: [
        'Menlo', // macOS
        'Consolas', // Windows
        '"Droid Sans Mono"', // Linux
        'monospace', // fallback
      ].join(','),
      fontFamilySystem: systemFont.join(','),
      fontFamilyTagline: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
      fontWeightExtraBold: 800,
      fontWeightSemiBold: 600,
      h1: {
        fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
        fontSize: 'clamp(2.625rem, 1.2857rem + 3.5714vw, 4rem)',
        fontWeight: 800,
        lineHeight: 78 / 70,
        ...(mode === 'light' && { color: blueDark[900] }),
      },
      h2: {
        color: mode === 'dark' ? grey[100] : blueDark[700],
        fontFamily: ['"PlusJakartaSans-ExtraBold"', ...systemFont].join(','),
        fontSize: 'clamp(1.5rem, 0.9643rem + 1.4286vw, 2.25rem)',
        fontWeight: 800,
        lineHeight: 44 / 36,
      },
      h3: {
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(36),
        letterSpacing: 0.2,
        lineHeight: 44 / 36,
      },
      h4: {
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(28),
        letterSpacing: 0.2,
        lineHeight: 42 / 28,
      },
      h5: {
        color: mode === 'dark' ? blue[300] : blue.main,
        fontFamily: ['"PlusJakartaSans-Bold"', ...systemFont].join(','),
        fontSize: defaultTheme.typography.pxToRem(24),
        letterSpacing: 0.1,
        lineHeight: 36 / 24,
      },
      h6: {
        fontSize: defaultTheme.typography.pxToRem(20),
        lineHeight: 30 / 20,
      },
      subtitle1: {
        fontSize: defaultTheme.typography.pxToRem(18),
        fontWeight: 500,
        letterSpacing: 0,
        lineHeight: 24 / 18,
      },
    },
  }) as ThemeOptions

export function getThemedComponents(): ThemeOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme: any = {
    components: {
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            ...(ownerState.size === 'large' && {
              padding: '0.875rem 1rem',
              ...theme.typography.body1,
              fontWeight: 700,
              lineHeight: 21 / 16,
            }),
            ...(ownerState.size === 'small' && { padding: theme.spacing(0.5, 1) }),
            ...(ownerState.variant === 'contained'
            && ownerState.color === 'primary' && {
              backgroundColor: (theme.vars || theme).palette.primary[500],
              color: '#fff',
            }),
          }),
        },
        variants: [
          {
            props: { variant: 'code' },
            style: ({ theme }) => [
              {
                '& .MuiButton-endIcon': {
                  color: (theme.vars || theme).palette.grey[700],
                  display: 'inline-block',
                  marginRight: 10,
                  position: 'absolute',
                  right: 0,
                },
                '& .MuiButton-startIcon': { color: (theme.vars || theme).palette.grey[400] },
                '&:hover, &.Mui-focusVisible': {
                  '& .MuiButton-endIcon': { color: (theme.vars || theme).palette.primary.main },
                  'backgroundColor': (theme.vars || theme).palette.grey[50],
                  'borderColor': (theme.vars || theme).palette.primary.main,
                },
                'WebkitFontSmoothing': 'subpixel-antialiased',
                'backgroundColor': (theme.vars || theme).palette.grey[50],
                'border': '1px solid',
                'borderColor': (theme.vars || theme).palette.grey[300],
                'color': (theme.vars || theme).palette.grey[800],

                'fontFamily': theme.typography.fontFamilyCode,

                'fontSize': defaultTheme.typography.pxToRem(13),

                'fontWeight': 400,

                'letterSpacing': 0,
                // 14px
                'lineHeight': 21 / 14,
              },
              theme.applyDarkStyles({
                '& .MuiButton-endIcon': { color: (theme.vars || theme).palette.grey[400] },
                '&:hover, &.Mui-focusVisible': {
                  '& .MuiButton-endIcon': { color: (theme.vars || theme).palette.primary[300] },
                  'backgroundColor': (theme.vars || theme).palette.primaryDark[600],
                },
                'backgroundColor': (theme.vars || theme).palette.primaryDark[700],
                'borderColor': (theme.vars || theme).palette.primaryDark[400],
                'color': (theme.vars || theme).palette.grey[400],
              }),
            ],
          },
          {
            props: { variant: 'link' },
            style: ({ theme }) => ({
              'color': (theme.vars || theme).palette.primary[600],
              'fontSize': theme.typography.pxToRem(14),
              'fontWeight': 700,
              ...theme.applyDarkStyles({ color: (theme.vars || theme).palette.primary[300] }),
              '& svg': { ml: -0.5 },
              'mb': 1,
            }),
          },
        ],
      },
      MuiButtonBase: { defaultProps: { disableTouchRipple: true } },
      MuiChip: {
        styleOverrides: {
          root: ({ ownerState: { color, variant }, theme }) => ({
            fontWeight: 500,
            ...(variant === 'outlined'
            && color === 'default' && {
              '&:hover': {
                backgroundColor: (theme.vars || theme).palette.grey[100],
                color: (theme.vars || theme).palette.grey[900],
              },
              'backgroundColor': alpha(theme.palette.grey[50], 0.5),
              'borderColor': (theme.vars || theme).palette.grey[200],
              'color': (theme.vars || theme).palette.grey[900],
              ...theme.applyDarkStyles({
                '&:hover': {
                  backgroundColor: (theme.vars || theme).palette.grey[700],
                  color: (theme.vars || theme).palette.grey[300],
                },
                'backgroundColor': alpha(theme.palette.grey[700], 0.3),
                'borderColor': alpha(theme.palette.grey[100], 0.1),
                'color': (theme.vars || theme).palette.grey[300],
              }),
            }),
            ...(variant === 'outlined'
            && color === 'primary' && { '&:hover': { color: (theme.vars || theme).palette.primary[500] } }),
            ...(variant === 'filled'
            && color === 'default' && {
              '&:hover': { backgroundColor: (theme.vars || theme).palette.primary[100] },
              'backgroundColor': alpha(theme.palette.primary[100], 0.5),
              'border': '1px solid transparent',
              'color': (theme.vars || theme).palette.primary[700],
              ...theme.applyDarkStyles({
                '&:hover': { backgroundColor: (theme.vars || theme).palette.primaryDark[600] },
                'backgroundColor': alpha(theme.palette.primaryDark[500], 0.8),
                'color': '#fff',
              }),
            }),
            // for labelling product in the search
            ...(variant === 'light' && {
              ...(color === 'default' && {
                backgroundColor: alpha(theme.palette.primary[100], 0.3),
                color: (theme.vars || theme).palette.primary[700],
                ...theme.applyDarkStyles({
                  backgroundColor: alpha(theme.palette.primaryDark[700], 0.5),
                  color: (theme.vars || theme).palette.primary[200],
                }),
              }),
              ...(color === 'warning' && {
                backgroundColor: (theme.vars || theme).palette.warning[100],
                color: (theme.vars || theme).palette.warning[900],
                ...theme.applyDarkStyles({
                  backgroundColor: (theme.vars || theme).palette.warning[900],
                  color: '#fff',
                }),
              }),
              ...(color === 'success' && {
                backgroundColor: (theme.vars || theme).palette.success[100],
                color: (theme.vars || theme).palette.success[900],
                ...theme.applyDarkStyles({
                  backgroundColor: (theme.vars || theme).palette.success[900],
                  color: '#fff',
                }),
              }),
            }),
          }),
        },
      },
      MuiCssBaseline: { defaultProps: { enableColorScheme: true } },
      MuiDivider: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: (theme.vars || theme).palette.grey[100],
            ...theme.applyDarkStyles({ borderColor: alpha(theme.palette.primary[100], 0.08) }),
          }),
        },
      },
      MuiIconButton: {
        variants: [
          {
            props: { color: 'primary' },
            style: ({ theme }) => [
              {
                '&:hover': {
                  background: (theme.vars || theme).palette.grey[50],
                  borderColor: (theme.vars || theme).palette.grey[300],
                },
                'border': '1px solid',
                'borderColor': (theme.vars || theme).palette.grey[200],
                'borderRadius': theme.shape.borderRadius,
                'color': (theme.vars || theme).palette.primary[500],
                'height': 34,
                'width': 34,
              },
              theme.applyDarkStyles({
                '&:hover': {
                  background: alpha(theme.palette.primaryDark[700], 0.4),
                  borderColor: (theme.vars || theme).palette.primaryDark[600],
                },
                'borderColor': (theme.vars || theme).palette.primaryDark[700],
                'color': (theme.vars || theme).palette.primary[300],
              }),
            ],
          },
        ],
      },
      MuiLink: {
        defaultProps: { underline: 'none' },
        styleOverrides: {
          root: {
            '& svg:last-child': { marginLeft: 2 },
            '&.MuiTypography-body1 > svg': { marginTop: 2 },
            'alignItems': 'center',
            'display': 'inline-flex',
            'fontWeight': 700,
          },
        },
        variants: [
          {
            props: { color: 'primary' },
            style: ({ theme }) => [
              {
                '&:hover': { color: (theme.vars || theme).palette.primary[700] },
                'color': (theme.vars || theme).palette.primary[600],
              },
              theme.applyDarkStyles({
                '&:hover': { color: (theme.vars || theme).palette.primary[200] },
                'color': (theme.vars || theme).palette.primary[300],
              }),
            ],
          },
        ],
      },
      MuiList: { styleOverrides: { root: { padding: 0 } } },
      MuiListItemButton: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              '&.Mui-selected': {
                '&:hover': { backgroundColor: (theme.vars || theme).palette.primary[100] },
                'backgroundColor': (theme.vars || theme).palette.primary[50],
                'border': '1px solid',
                'borderColor': `${(theme.vars || theme).palette.primary[500]} !important`,
                'borderRadius': 10,
                'color': (theme.vars || theme).palette.primary[500],
              },
              '&:hover': { backgroundColor: theme.palette.grey[50] },
              'borderRadius': 0,
              'color': theme.palette.grey[700],
              'fontSize': theme.typography.pxToRem(14),
              'fontWeight': 500,
              'padding': '8px',
              'textTransform': 'none',
            },
            theme.applyDarkStyles({
              '&.Mui-selected': {
                '&:hover': { backgroundColor: (theme.vars || theme).palette.primaryDark[600] },
                'backgroundColor': (theme.vars || theme).palette.primaryDark[700],
                'borderColor': `${(theme.vars || theme).palette.primary[700]} !important`,
                'color': '#fff',
              },
              '&:hover': { backgroundColor: alpha(theme.palette.primaryDark[700], 0.4) },
              'color': theme.palette.grey[300],
            }),
          ],
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: ({ theme }) => [
            {
              '& .MuiMenuItem-root': {
                '&.Mui-selected': {
                  backgroundColor: alpha(theme.palette.primary[100], 0.6),
                  color: (theme.vars || theme).palette.primary[600],
                  fontWeight: 500,
                },
                '&:hover, &:focus': { backgroundColor: (theme.vars || theme).palette.grey[50] },
                'fontSize': theme.typography.pxToRem(14),
                'fontWeight': 500,
              },
              'backgroundColor': (theme.vars || theme).palette.background.paper,
              'backgroundImage': 'none',
              'border': '1px solid',
              'borderColor': (theme.vars || theme).palette.grey[200],
              'color': (theme.vars || theme).palette.text.secondary,
              'minWidth': 160,
            },
            theme.applyDarkStyles({
              '& .MuiMenuItem-root': {
                '&.Mui-selected': {
                  backgroundColor: (theme.vars || theme).palette.primaryDark[700],
                  color: (theme.vars || theme).palette.primary[300],
                },
                '&:hover, &:focus': { backgroundColor: alpha(theme.palette.primaryDark[700], 0.4) },
              },
              'backgroundColor': (theme.vars || theme).palette.primaryDark[900],
              'borderColor': (theme.vars || theme).palette.primaryDark[700],
            }),
          ],
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              '&.Mui-selected': {
                '&:hover': { backgroundColor: (theme.vars || theme).palette.primary[100] },
                'backgroundColor': (theme.vars || theme).palette.primary[50],
                'borderColor': `${(theme.vars || theme).palette.primary[500]} !important`,
                'color': (theme.vars || theme).palette.primary[500],
              },
              'borderColor': theme.palette.grey[200],
              'color': theme.palette.grey[700],
              'fontWeight': 700,
              'textTransform': 'none',
            },
            theme.applyDarkStyles({
              '&.Mui-selected': {
                '&:hover': { backgroundColor: (theme.vars || theme).palette.primaryDark[600] },
                'backgroundColor': (theme.vars || theme).palette.primaryDark[700],
                'borderColor': `${(theme.vars || theme).palette.primary[700]} !important`,
                'color': '#fff',
              },
              'borderColor': theme.palette.primaryDark[500],
              'color': theme.palette.grey[300],
            }),
          ],
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: ({ theme, ownerState }) => [
            {
              '&[href]': { textDecorationLine: 'none' },
              'backgroundColor': '#fff',
              'backgroundImage': 'none',
              ...(ownerState.variant === 'outlined' && {
                ':is(a, button)': { '&:hover': { boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)' } },
                'borderColor': (theme.vars || theme).palette.grey[200],
                'display': 'block',
              }),
            },
            theme.applyDarkStyles({
              backgroundColor: (theme.vars || theme).palette.primaryDark[900],
              ...(ownerState.variant === 'outlined' && {
                ':is(a, button)': { '&:hover': { boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)' } },
                'backgroundColor': (theme.vars || theme).palette.primaryDark[700],
                'borderColor': (theme.vars || theme).palette.primaryDark[500],
              }),
            }),
          ],
        },
      },
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            boxShadow: '0px 4px 20px rgba(170, 180, 190, 0.3)',
            ...theme.applyDarkStyles({ boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)' }),
          }),
        },
      },
      MuiSelect: {
        defaultProps: { IconComponent: ArrowDropDownRounded },
        styleOverrides: { iconFilled: { top: 'calc(50% - .25em)' } },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            '& .MuiSwitch-switchBase': {
              '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(11px)',
              },
            },
            'height': 20,
            'padding': 0,
            'width': 32,
          },
          switchBase: {
            '&.Mui-checked + .MuiSwitch-track': { opacity: 1 },
            'color': '#fff',
            'height': 20,
            'padding': 0,
            'width': 20,
          },
          thumb: {
            flexShrink: 0,
            height: '14px',
            width: '14px',
          },
          track: ({ theme }) => ({
            backgroundColor: theme.palette.grey[400],
            borderRadius: 32,
            opacity: 1,
            ...theme.applyDarkStyles({ backgroundColor: theme.palette.grey[800] }),
          }),
        },
      },
      MuiTab: {
        defaultProps: { disableTouchRipple: true },
        styleOverrides: {
          root: ({ theme }) => [
            {
              '&:hover': { background: (theme.vars || theme).palette.grey[50] },
              'borderRadius': 12,
              'fontWeight': 600,
              'marginBottom': theme.spacing(1),
              'marginRight': theme.spacing(1),
              'minHeight': 32,
              'minWidth': 0,
              'padding': theme.spacing(1),
            },
            theme.applyDarkStyles({
              '&.Mui-selected': { color: (theme.vars || theme).palette.primary[300] },
              '&:hover': { background: (theme.vars || theme).palette.primaryDark[700] },
            }),
          ],
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme, ownerState }) => ({
            borderColor: (theme.vars || theme).palette.divider,
            padding: theme.spacing(1, 2),
            ...(ownerState.variant === 'head' && {
              color: (theme.vars || theme).palette.text.primary,
              fontWeight: 700,
            }),
            ...(ownerState.variant === 'body' && { color: (theme.vars || theme).palette.text.secondary }),
          }),
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: ({ theme }) => [
            {
              '&.Mui-selected': {
                backgroundColor: (theme.vars || theme).palette.primary[50],
                borderColor: `${(theme.vars || theme).palette.primary[500]} !important`,
                color: (theme.vars || theme).palette.primary[500],
              },
              'borderColor': theme.palette.grey[200],
              'color': theme.palette.grey[700],
              'fontWeight': 500,
              'textTransform': 'none',
            },
            theme.applyDarkStyles({
              '&.Mui-selected': {
                '&:hover': { backgroundColor: (theme.vars || theme).palette.primaryDark[600] },
                'backgroundColor': (theme.vars || theme).palette.primaryDark[700],
                'borderColor': `${(theme.vars || theme).palette.primary[700]} !important`,
                'color': '#fff',
              },
              'borderColor': theme.palette.primaryDark[500],
              'color': theme.palette.grey[300],
            }),
          ],
        },
      },
      MuiToggleButtonGroup: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: '#fff',
            ...theme.applyDarkStyles({ backgroundColor: (theme.vars || theme).palette.primaryDark[900] }),
          }),
        },
      },
      MuiTooltip: { styleOverrides: { tooltip: { padding: '6px 12px' } } },
    },
  }
  return theme as ThemeOptions
}

export const brandingDarkTheme = createTheme({
  ...getDesignTokens('dark'),
  ...getThemedComponents(),
})

export const brandingLightTheme = createTheme({
  ...getDesignTokens('light'),
  ...getThemedComponents(),
})

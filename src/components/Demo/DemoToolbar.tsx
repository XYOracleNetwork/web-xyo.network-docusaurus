/* eslint-disable max-statements */
import ResetFocusIcon from '@mui/icons-material/CenterFocusWeak'
import CodeRoundedIcon from '@mui/icons-material/CodeRounded'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import Fade from '@mui/material/Fade'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Snackbar from '@mui/material/Snackbar'
import { styled, useTheme } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip, { TooltipProps } from '@mui/material/Tooltip'
import copy from 'clipboard-copy'
import * as React from 'react'

import { CODE_VARIANT } from './constants'
import { DemoConfig, DemoOptions } from './Demo'
import { JavaScript as JavaScriptIcon, TypeScript as TypeScriptIcon } from './mui-docs'
import { createCodeSandboxReactApp, createStackBlitzReactApp } from './sandbox'
// eslint-disable-next-line import/no-internal-modules
import { DependenciesSet } from './sandbox/getDependencies'
import { getCookie, useCodeVariant, useSetCodeVariant } from './utils'

const Root = styled('div')(({ theme }) => [
  {
    '& .MuiSvgIcon-root': {
      color: (theme.vars || theme).palette.grey[800],
      fontSize: 17,
    },
    /*[theme.breakpoints.up('sm')]: {*/
    display: 'flex',
    height: theme.spacing(8),
    top: 0,
    ...(theme.direction === 'rtl' && {
      left: theme.spacing(1),
    }),
    ...(theme.direction !== 'rtl' && {
      right: theme.spacing(1),
    }),
    /*},*/
    alignItems: 'center',
    /*display: 'none',*/
    justifyContent: 'space-between',
  },
  /*theme.applyDarkStyles({
    '& .MuiSvgIcon-root': {
      color: (theme.vars || theme).palette.grey[400],
    },
  }),*/
])

const DemoTooltip: React.FC<TooltipProps> = (props) => {
  return (
    <Tooltip
      componentsProps={{
        popper: {
          sx: {
            zIndex: (theme) => theme.zIndex.appBar - 1,
          },
        },
      }}
      {...props}
    />
  )
}

interface ToggleCodeTooltipProps extends TooltipProps {
  showSourceHint?: boolean
}

const ToggleCodeTooltip: React.FC<ToggleCodeTooltipProps> = ({ showSourceHint, ...props }) => {
  const atLeastSmallViewport = true //useMediaQuery((theme) => true /*theme.breakpoints.up('sm')*/)
  const [open, setOpen] = React.useState(false)

  return (
    <DemoTooltip {...props} onClose={() => setOpen(false)} onOpen={() => setOpen(true)} open={showSourceHint && atLeastSmallViewport ? true : open} />
  )
}

export function DemoToolbarFallback() {
  return <Root aria-busy aria-label={'demo source'} role="toolbar" />
}

const alwaysTrue = () => true

/**
 * @param {React.Ref<HTMLElement>[]} controlRefs
 * @param {object} [options]
 * @param {(index: number) => boolean} [options.isFocusableControl] In case certain controls become unfocusable
 * @param {number} [options.defaultActiveIndex]
 */

interface ToolbarOptions {
  defaultActiveIndex?: number
  isFocusableControl?: (index: number) => boolean
}

function useToolbar(controlRefs?: React.Ref<HTMLButtonElement>[], options: ToolbarOptions = {}) {
  const { defaultActiveIndex = 0, isFocusableControl = alwaysTrue } = options
  const [activeControlIndex, setActiveControlIndex] = React.useState(defaultActiveIndex)

  // TODO: do we need to do this during layout practically? It's technically
  // a bit too late since we allow user interaction between layout and passive effects
  React.useEffect(() => {
    setActiveControlIndex((currentActiveControlIndex: number) => {
      if (!isFocusableControl(currentActiveControlIndex)) {
        return defaultActiveIndex
      }
      return currentActiveControlIndex
    })
  }, [defaultActiveIndex, isFocusableControl])

  // controlRefs.findIndex(controlRef => controlRef.current = element)
  function findControlIndex(element: Element) {
    let controlIndex = -1
    controlRefs?.forEach((controlRef, index) => {
      if (controlRef !== null && typeof controlRef === 'object') {
        if (controlRef.current === element) {
          controlIndex = index
        }
      }
    })
    return controlIndex
  }

  function handleControlFocus(event: React.FocusEvent) {
    const nextActiveControlIndex = findControlIndex(event.target)
    if (nextActiveControlIndex !== -1) {
      setActiveControlIndex(nextActiveControlIndex)
    }
  }

  let handleToolbarFocus

  const { direction } = useTheme()

  function handleToolbarKeyDown(event: React.KeyboardEvent) {
    // We handle toolbars where controls can be hidden temporarily.
    // When a control is hidden we can't move focus to it and have to exclude
    // it from the order.
    let currentFocusableControlIndex = -1
    const focusableControls: HTMLElement[] = []
    controlRefs?.forEach((controlRef, index) => {
      if (controlRef !== null && typeof controlRef === 'object') {
        const control = controlRef.current
        if (index === activeControlIndex) {
          currentFocusableControlIndex = focusableControls.length
        }
        if (control !== null && isFocusableControl(index)) {
          focusableControls.push(control)
        }
      }
    })

    const prevControlKey = direction === 'ltr' ? 'ArrowLeft' : 'ArrowRight'
    const nextControlKey = direction === 'ltr' ? 'ArrowRight' : 'ArrowLeft'

    let nextFocusableIndex = -1
    switch (event.key) {
      case prevControlKey:
        nextFocusableIndex = (currentFocusableControlIndex - 1 + focusableControls.length) % focusableControls.length
        break
      case nextControlKey:
        nextFocusableIndex = (currentFocusableControlIndex + 1) % focusableControls.length
        break
      case 'Home':
        nextFocusableIndex = 0
        break
      case 'End':
        nextFocusableIndex = focusableControls.length - 1
        break
      default:
        break
    }

    if (nextFocusableIndex !== -1) {
      event.preventDefault()
      focusableControls[nextFocusableIndex].focus()
    }
  }

  function getControlProps(index: number) {
    return {
      onFocus: handleControlFocus,
      ref: controlRefs?.[index],
      tabIndex: index === activeControlIndex ? 0 : -1,
    }
  }

  return {
    getControlProps,
    toolbarProps: {
      // TODO: good opportunity to warn on missing `aria-label`
      onFocus: handleToolbarFocus,
      onKeyDown: handleToolbarKeyDown,
      role: 'toolbar',
    },
  }
}

export interface DemoToolbarProps {
  codeOpen: boolean
  demo: Omit<DemoConfig, 'codeVariant'> & { codeVariant?: CODE_VARIANT }
  demoData: DemoConfig
  demoHovered: boolean
  demoId?: string
  demoName?: string
  demoOptions: DemoOptions
  demoSourceId?: string
  deps?: DependenciesSet[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialFocusRef: React.RefObject<any>
  onCodeOpenChange: () => void
  onResetDemoClick: () => void
  openDemoSource?: boolean
  showPreview?: boolean
}

export const DemoToolbar: React.FC<DemoToolbarProps> = (props) => {
  const {
    codeOpen,
    demo,
    demoData,
    demoId,
    demoHovered,
    demoName,
    demoOptions,
    demoSourceId,
    deps = [],
    initialFocusRef,
    onCodeOpenChange,
    onResetDemoClick,
    openDemoSource,
    showPreview,
  } = props

  const setCodeVariant = useSetCodeVariant()
  const codeVariant = useCodeVariant()

  const hasTSVariant = demo.rawTS
  const renderedCodeVariant = (): CODE_VARIANT => {
    if (codeVariant === 'TS' && hasTSVariant) {
      return 'TS'
    }
    return 'JS'
  }

  const handleCodeLanguageClick = (event: React.MouseEvent<HTMLElement, MouseEvent>, clickedCodeVariant: CODE_VARIANT) => {
    if (clickedCodeVariant !== null && codeVariant !== clickedCodeVariant) {
      setCodeVariant(clickedCodeVariant)
    }
  }

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const handleMoreClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMoreClose = () => {
    setAnchorEl(null)
  }

  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>()

  const handleSnackbarClose = () => {
    setSnackbarOpen(false)
  }
  const handleCopyClick = async () => {
    try {
      await copy(demoData.raw ?? 'No Code')
      setSnackbarMessage('The source code has been copied to your clipboard.')
      setSnackbarOpen(true)
    } finally {
      handleMoreClose()
    }
  }

  const createHandleCodeSourceLink = (anchor: string) => async () => {
    try {
      await copy(`${window.location.href.split('#')[0]}#${anchor}`)
      setSnackbarMessage('Link to the source code has been copied to your clipboard.')
      setSnackbarOpen(true)
    } finally {
      handleMoreClose()
    }
  }

  const [sourceHintSeen, setSourceHintSeen] = React.useState(false)
  React.useEffect(() => {
    setSourceHintSeen(!!getCookie('sourceHintSeen'))
  }, [])
  const handleCodeOpenClick = () => {
    document.cookie = 'sourceHintSeen=true;path=/;max-age=31536000'
    onCodeOpenChange()
    setSourceHintSeen(true)
  }

  const handleResetFocusClick = () => {
    initialFocusRef.current.focusVisible()
  }

  const showSourceHint = demoHovered && !sourceHintSeen

  let showCodeLabel
  if (codeOpen) {
    showCodeLabel = showPreview ? 'Hide the full source' : 'Hide the source'
  } else {
    showCodeLabel = showPreview ? 'Show the full source' : 'Show the source'
  }

  const controlRefs: React.MutableRefObject<HTMLButtonElement | null>[] = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ]
  // if the code is not open we hide the first two language controls
  const isFocusableControl = React.useCallback((index: number) => (codeOpen ? true : index >= 2), [codeOpen])
  const { getControlProps, toolbarProps } = useToolbar(controlRefs, {
    defaultActiveIndex: 2,
    isFocusableControl,
  })

  const devMenuItems: string[] = []

  return (
    <React.Fragment>
      <Root aria-label={'demo source'} {...toolbarProps}>
        <Fade in={codeOpen}>
          <ToggleButtonGroup sx={{ margin: '8px 0' }} exclusive value={renderedCodeVariant()} onChange={handleCodeLanguageClick}>
            <ToggleButton
              sx={(_theme) => ({
                borderColor: 'grey.200',
                borderRadius: 0.5,
                padding: '5px 10px',
                /*...theme.applyDarkStyles({
                  borderColor: 'primaryDark.700',
                }),*/
              })}
              value={'JS'}
              aria-label={'Show JavaScript source'}
              data-ga-event-category="demo"
              data-ga-event-action="source-js"
              data-ga-event-label={demo.gaLabel}
              {...getControlProps(0)}
            >
              <JavaScriptIcon sx={{ color: '#3A750A !important', fontSize: 20 }} />
            </ToggleButton>
            <ToggleButton
              sx={(_theme) => ({
                '&.Mui-disabled': {
                  opacity: 0.5,
                },
                borderColor: 'grey.200',
                borderRadius: 0.5,
                padding: '5px 10px',
                /*...theme.applyDarkStyles({
                  borderColor: 'primaryDark.700',
                }),*/
              })}
              value={'TS'}
              disabled={!hasTSVariant}
              aria-label={'Show TypeScript source'}
              data-ga-event-category="demo"
              data-ga-event-action="source-ts"
              data-ga-event-label={demo.gaLabel}
              {...getControlProps(1)}
            >
              <TypeScriptIcon sx={{ color: '#2D79C7 !important', fontSize: 20 }} />
            </ToggleButton>
          </ToggleButtonGroup>
        </Fade>
        <div>
          <ToggleCodeTooltip showSourceHint={showSourceHint} PopperProps={{ disablePortal: true }} title={showCodeLabel} placement="bottom">
            <IconButton
              size="large"
              aria-controls={openDemoSource ? demoSourceId : undefined}
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="expand"
              onClick={handleCodeOpenClick}
              color="default"
              {...getControlProps(2)}
            >
              <CodeRoundedIcon />
            </IconButton>
          </ToggleCodeTooltip>
          {demoOptions.hideEditButton ? null : (
            <React.Fragment>
              <DemoTooltip title={'Edit in CodeSandbox'} placement="bottom">
                <IconButton
                  size="large"
                  data-ga-event-category="demo"
                  data-ga-event-label={demo.gaLabel}
                  data-ga-event-action="codesandbox"
                  onClick={() => createCodeSandboxReactApp(demoData, deps).openSandbox('/demo')}
                  {...getControlProps(3)}
                >
                  <SvgIcon viewBox="0 0 1024 1024">
                    <path d="M755 140.3l0.5-0.3h0.3L512 0 268.3 140h-0.3l0.8 0.4L68.6 256v512L512 1024l443.4-256V256L755 140.3z m-30 506.4v171.2L548 920.1V534.7L883.4 341v215.7l-158.4 90z m-584.4-90.6V340.8L476 534.4v385.7L300 818.5V646.7l-159.4-90.6zM511.7 280l171.1-98.3 166.3 96-336.9 194.5-337-194.6 165.7-95.7L511.7 280z" />
                  </SvgIcon>
                </IconButton>
              </DemoTooltip>
              <DemoTooltip title={'Edit in StackBlitz'} placement="bottom">
                <IconButton
                  size="large"
                  data-ga-event-category="demo"
                  data-ga-event-label={demo.gaLabel}
                  data-ga-event-action="stackblitz"
                  onClick={() => createStackBlitzReactApp(demoData, deps).openSandbox('demo')}
                  {...getControlProps(4)}
                >
                  <SvgIcon viewBox="0 0 19 28">
                    <path d="M8.13378 16.1087H0L14.8696 0L10.8662 11.1522L19 11.1522L4.13043 27.2609L8.13378 16.1087Z" />
                  </SvgIcon>
                </IconButton>
              </DemoTooltip>
            </React.Fragment>
          )}
          <DemoTooltip title={'Copy the source'} placement="bottom">
            <IconButton
              size="large"
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="copy"
              onClick={handleCopyClick}
              {...getControlProps(5)}
            >
              <ContentCopyRoundedIcon />
            </IconButton>
          </DemoTooltip>
          <DemoTooltip title={'Reset focus to test keyboard navigation'} placement="bottom">
            <IconButton
              size="large"
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="reset-focus"
              onClick={handleResetFocusClick}
              {...getControlProps(6)}
            >
              <ResetFocusIcon />
            </IconButton>
          </DemoTooltip>
          <DemoTooltip title={'Reset demo'} placement="bottom">
            <IconButton
              size="large"
              aria-controls={demoId}
              data-ga-event-category="demo"
              data-ga-event-label={demo.gaLabel}
              data-ga-event-action="reset"
              onClick={onResetDemoClick}
              {...getControlProps(7)}
            >
              <RefreshRoundedIcon />
            </IconButton>
          </DemoTooltip>
          <IconButton
            size="large"
            onClick={handleMoreClick}
            aria-label={'See more'}
            aria-owns={anchorEl ? 'demo-menu-more' : undefined}
            aria-haspopup="true"
            {...getControlProps(8)}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      </Root>
      <Menu
        id="demo-menu-more"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMoreClose}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'bottom',
        }}
        transformOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
      >
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="github"
          component="a"
          href={demoData.githubLocation}
          target="_blank"
          rel="noopener nofollow"
          onClick={handleMoreClose}
        >
          {'View the source on GitHub'}
        </MenuItem>
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="copy-js-source-link"
          onClick={createHandleCodeSourceLink(`${demoName}.js`)}
        >
          {'Copy link to JavaScript source'}
        </MenuItem>
        <MenuItem
          data-ga-event-category="demo"
          data-ga-event-label={demo.gaLabel}
          data-ga-event-action="copy-ts-source-link"
          onClick={createHandleCodeSourceLink(`${demoName}.tsx`)}
        >
          {'Copy link to TypeScript source'}
        </MenuItem>
        {devMenuItems}
      </Menu>
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose} message={snackbarMessage} />
    </React.Fragment>
  )
}

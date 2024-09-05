import {
  alpha, Paper, styled, useTheme,
} from '@mui/material'
import type { BoxProps } from '@mui/material/Box'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import * as React from 'react'

interface SingleCliTabProps {
  tabContent: string
  tabTitle: string
}

interface CliTabsProps extends BoxProps {
  tabs: SingleCliTabProps[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const {
    children, value, index, ...other
  } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

const AntTabs = styled(Tabs)({
  '& .MuiTabs-indicator': { backgroundColor: '#1890ff' },
  'borderBottom': '1px solid #e8e8e8',
})

const AntTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  '&.Mui-focusVisible': { backgroundColor: '#d1eaff' },
  '&.Mui-selected': {
    color: '#1890ff',
    fontWeight: theme.typography.fontWeightMedium,
  },
  [theme.breakpoints.up('sm')]: { minWidth: 0 },
  '&:hover': {
    color: '#40a9ff',
    opacity: 1,
  },
  'color': 'rgba(0, 0, 0, 0.85)',
  'fontFamily': [
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
  ].join(','),
  'fontWeight': theme.typography.fontWeightRegular,
  'marginRight': theme.spacing(1),
  'minWidth': 0,
  'textTransform': 'none',
}))

interface StyledTabsProps {
  children?: React.ReactNode
  onChange: (event: React.SyntheticEvent, newValue: number) => void
  value: number
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  '& .MuiTabs-indicator': {
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
  },
  '& .MuiTabs-indicatorSpan': {
    backgroundColor: '#635ee7',
    maxWidth: 40,
    width: '100%',
  },
})

interface StyledTabProps {
  label: string
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(({ theme }) => ({
  '&.Mui-focusVisible': { backgroundColor: 'rgba(100, 95, 228, 0.32)' },
  '&.Mui-selected': { color: '#fff' },
  'color': 'rgba(255, 255, 255, 0.7)',
  'fontSize': theme.typography.pxToRem(15),
  'fontWeight': theme.typography.fontWeightBold,
  'marginRight': theme.spacing(1),
  'textTransform': 'none',
}))

function a11yProps(index: number) {
  return {
    'aria-controls': `simple-tabpanel-${index}`,
    'id': `simple-tab-${index}`,
  }
}
export const CliTabs: React.FC<CliTabsProps> = ({ tabs, ...props }) => {
  const [value, setValue] = React.useState(0)
  const theme = useTheme()
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }} {...props}>
      <Paper sx={{
        bgcolor: '#252529', borderRadius: '10px', color: '#ffffff',
      }}
      >
        <Box style={{
          backgroundColor: alpha('#ffffff', 0.1), borderBottom: 2, borderColor: 'lightgray', borderRadius: '10px 10px 0px 0px',
        }}
        >
          <StyledTabs value={value} onChange={handleChange} aria-label="basic tabs example">
            {tabs.map((item, index) => {
              return <StyledTab key={`${index}-tab`} label={item.tabTitle} {...a11yProps(index)} />
            })}
          </StyledTabs>
        </Box>
        {tabs.map((item, index) => {
          return (
            <TabPanel key={`${index}-tab-panel`} value={value} index={index}>
              <Typography variant="body1">{item.tabContent}</Typography>
            </TabPanel>
          )
        })}
      </Paper>
    </Box>
  )
}

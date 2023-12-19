import { Link } from '@mui/material'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import * as React from 'react'

import { CliTabs } from './cli-tabs'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box paddingTop={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    'aria-controls': `simple-tabpanel-${index}`,
    id: `simple-tab-${index}`,
  }
}
export const InstallXyoOptions: React.FC = (props) => {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Javascript" {...a11yProps(0)} />
          <Tab label="React" {...a11yProps(1)} />
          <Tab label="Android/Kotlin/Java" {...a11yProps(2)} />
          <Tab label="Swift/iOS/OSX" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CliTabs
          tabs={[
            { tabContent: 'npm i --save @xyo-network/sdk-xyo-client-js', tabTitle: 'npm' },
            { tabContent: 'yarn add @xyo-network/sdk-xyo-client-js', tabTitle: 'yarn' },
          ]}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CliTabs
          tabs={[
            { tabContent: 'npm i --save @xyo-network/sdk-xyo-react', tabTitle: 'npm' },
            { tabContent: 'yarn add @xyo-network/sdk-xyo-react', tabTitle: 'yarn' },
          ]}
        />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography variant="body1">
          You can find the instructions for the XYO Android SDK{' '}
          <Link href="https://jitpack.io/#xyoraclenetwork/sdk-xyo-client-android" target="_blank">
            here
          </Link>
          .
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography variant="body1">
          You can find the instructions for the XYO Android SDK <Link href="/sdks/swift">here</Link>.
        </Typography>
      </TabPanel>
    </Box>
  )
}

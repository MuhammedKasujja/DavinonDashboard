import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import CouponForm from '../Coupons/CouponForm';
import PushNotificationForm from '../PushNotifications/PushNotificationForm';
import AdvertForm from '../Adverts/AdvertForm';
import AppSettingsForm from './AppSettings';
import BrandsTable from 'App/views/CarBrands/BrandsTable';
import MiscellaineousPage from '../Miscellaineous';
import UsersTable from '../Users';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Settings" {...a11yProps(0)} />
          <Tab label="Car Brands" {...a11yProps(1)} />
          <Tab label="Promo Codes" {...a11yProps(2)} />
          <Tab label="Notifications" {...a11yProps(3)} />
          <Tab label="Car Types" {...a11yProps(4)} />
          <Tab label="Users" {...a11yProps(5)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <AppSettingsForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BrandsTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CouponForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <PushNotificationForm />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <MiscellaineousPage />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <UsersTable />
      </TabPanel>
    </div>
  );
}

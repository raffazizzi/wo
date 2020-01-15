import React from 'react';
import PropTypes from 'prop-types';
import WoData from './WoData';
import './App.css';
import anchor from './anchor.svg';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';

import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#141926'
    },
    text: {
      primary: {
        main: '#141926'
      },     
    },
    secondary: {
      main: '#01A9DB',
    },
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="App">
      <div className="header"><a href="https://airtable.com/tbl3m3QRI8q9N0n3l/viwh9YqwZxENXZhQV">
        <img className="anchor" src={anchor}/></a></div>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          centered
        >
          <Tab label="Weight"/>
          <Tab label="Reps"/>
          <Tab label="Sets"/>
        </Tabs>
      </Paper>
        <div>
          <TabPanel value={value} index={0}>        
            <WoData show="Weight" scale="140"/>      
          </TabPanel>
          <TabPanel value={value} index={1}>
            <WoData show="Reps" scale="20"/>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <WoData show="Sets" scale="10"/>
          </TabPanel>
        </div>
    </div>
  );
}

export default App;

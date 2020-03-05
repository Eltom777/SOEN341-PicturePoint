//React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

//Style
const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
});

//Render
function Taskbar(props) {
    const classes = useStyles();
    const [value, setValue] = useState(0); //<- BUG here
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
            <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
            >
                <Tab label="My Friends" component={Link} to="/Friends" />
                <Tab label="My Photos" component={Link} to="/Photos" />
                <Tab label="My Albums" disabled />
            </Tabs>
        </Paper>
    );
}

export default Taskbar;
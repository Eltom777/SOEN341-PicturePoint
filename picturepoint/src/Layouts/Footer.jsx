import React, { useState } from 'react';

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
function Footer() {
    const classes = useStyles();
    const [value, setValue] = useState(1); //Set to 1 to start at "My Profile"
  
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
                <Tab label="My Feed" />
                <Tab label="My Profile" />
                <Tab label="My Photos" />
            </Tabs>
        </Paper>
    );
}

export default Footer;
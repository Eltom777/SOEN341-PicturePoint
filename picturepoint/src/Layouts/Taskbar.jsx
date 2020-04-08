//React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider';

//Style
const useStyles = makeStyles({
    root: {
      flexGrow: 1,
    },
    taskbar: {
        backgroundColor: '#F5F5F5'
    },
    tabs: {
        backgroundColor: 'white'
    },
    divider: {
        width: 1000,
        position: 'absolute',
        left: '23%',
        right: '77%'
    }
});

//Render
function Taskbar(props) {
    const classes = useStyles();
    
    //Taskbar state handling
    var select;
    if(props.state === 'Friends')
        select = 0;
    else
        select = 1;

    const [value, setValue] = useState(select);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <div>
            <Paper className={classes.root} elevation={0}>
                <Tabs
                className={classes.taskbar}
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
                >
                    <Tab label="My Friends" component={Link} to={`/${props.username}/Friends`} />
                    <Tab label="My Photos" component={Link} to={`/${props.username}`} />
                </Tabs>
            </Paper>
            <Divider className={classes.divider} variant="middle" />
        </div>
    );
}

export default Taskbar;
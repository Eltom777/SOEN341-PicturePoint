//React
import React, { Fragment } from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//Style
const useStyles = makeStyles({
    root: {

    }
});

function Photos(props) {
    const classes = useStyles();
    return(
        <div>
            <Typography>Photos</Typography>
        </div>
    );
}

export default Photos; 
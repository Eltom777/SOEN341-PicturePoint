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
    paper: {
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        height: 800, 
        width: 900,
        overflow: 'auto'
    },
});

function Photos(props) {
    const classes = useStyles();
    return(
        <div>
            <Box display="flex" justifyContent="center">
                <Paper className={classes.paper} elevation={3}>
                   <Typography variant="h4" align="center">
                       Place holder for photo list
                   </Typography>
                </Paper>
            </Box>
        </div>
    );
}

export default Photos; 
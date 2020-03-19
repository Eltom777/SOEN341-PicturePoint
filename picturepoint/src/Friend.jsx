//React
import React, { useState, useEffect } from 'react';

//Firebase function


//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//Style
const useStyles = makeStyles({
    paper: {
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        minHeight: 500, 
        width: 900,
        overflow: 'auto',
    }
});

function Friend({ match }) {
    const classes = useStyles();
    
    var userID = match.params.id;

    //Runs fecthing 
    useEffect(() => {
        fetchUser();
        console.log(userID);
    }, []);

    const fetchUser = async () => {
        
    }

    return(
        <div>
            <Box display="flex" justifyContent="center">
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h4" align="center">
                        {userID}
                   </Typography>
                </Paper>
            </Box>
        </div>
    );
}

export default Friend; 
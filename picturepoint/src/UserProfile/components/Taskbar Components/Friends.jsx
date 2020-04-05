//React
import React, { useState, useEffect, Fragment } from 'react';
import {Link} from 'react-router-dom';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

//Functions
import { getFollowers, getFollowing } from '../../../Functions/DataProcessor';
import GetFollowers from '../../../components/GetFollowers';
import GetFollowings from '../../../components/GetFollowings';
import FollowUser from '../../../components/FollowUser';
import UnfollowUser from '../../../components/UnfollowUser';

//Style
const useStyles = makeStyles({
    paper: {
        padding: 10,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        minHeight: 515, 
        overflow: 'auto'
    },
    avatarSize: {
        fontSize: '20px',
        width: '40px',
        height: '40px'
    }
});

function Friends(props) {
    const classes = useStyles();

    return(
        <div>
            <Box>
                <Grid container>
                    <Grid item xs>
                        <Paper className={classes.paper} elevation={3}>
                            <Typography variant="h4" align="center">
                                Followers
                            </Typography>
                            <GetFollowers username={props.username} />
                        </Paper>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper} elevation={3}>
                            <Typography variant="h4" align="center">
                                Following
                            </Typography>
                            <GetFollowings username={props.username} />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}

export default Friends;
//React
import React from 'react';
import {Link} from 'react-router-dom';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';

import FollowUser from '../../components/FollowUser';
import UnfollowUser from '../../components/UnfollowUser';
import IsFollowing from '../../components/IsFollowing';

//Style
const useStyles = makeStyles({
    card: {
      width: 720,
      backgroundColor: 'white',
      padding: 3,
      marginTop: 30,
      marginBottom: 10
    },
    cardContent: {
        width: 470
    },
    avatar: {
        marginTop: 30,
        marginRight: 10
    },
    avatarSize: {
        marginLeft: 3,
        width: '80px',
        height: '80px'
    },
    posBottom: {
        marginTop: 20,
    },
    editIcon: {
        marginTop: 3,
        marginLeft: 52
    },
    followButton: {
        width: 100,
        marginTop: 2,
    }
});

function ProfileCard(props) {
    const classes = useStyles();

    //Login user properties
    var user = props.currentUser;
    var date = new Date(user.creationDate);

    var button;

    if(props.isCurrentUser) {
        button = (
            <Fab className={classes.editIcon} size="small" color="secondary" aria-label="edit" component={Link} to={`/${localStorage.getItem("username")}/Account`} >
                <EditIcon />
            </Fab>
        );
    } else {
        button = (
            <IsFollowing username={user.username}/>
        );
    }

    //Renders the profile card
    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Card className={classes.card}>
                    <Grid container >
                        <Grid item className={classes.avatar}>
                            <Avatar className={classes.avatarSize}>{null}</Avatar>
                        </Grid>
                        <Grid item>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h3" color="inherit">
                                    {user.username}
                                </Typography>
                                <Typography variant="h5">
                                    {user.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {user.email}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    {user.bio}
                                </Typography>
                                <Typography className={classes.posBottom} variant="body2" color="textSecondary">
                                    Member since {date.toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                                </Typography>
                            </CardContent>
                        </Grid>
                        <Grid item >
                            {button}
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </div>
    );
}

export default ProfileCard;
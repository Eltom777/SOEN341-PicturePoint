import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';

//Style
const useStyles = makeStyles({
    root: {
      width: 700,
      backgroundColor: 'whitesmoke',
      padding: 10,
      marginTop: 10,
      marginBottom: 10
    },
    avatar: {
      marginTop: 30,
      marginRight: 10
    },
    avatarSize: {
        fontSize: '40px',
        width: '80px',
        height: '80px'
    },
    posBottom: {
        marginTop: 20,
      }
});

function Profile(props) {
    const classes = useStyles();
    var date = new Date(props.creationDate);

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Card className={classes.root}>
                    <Grid container >
                        <Grid item className={classes.avatar}>
                            <Avatar className={classes.avatarSize}>A</Avatar>
                        </Grid>
                        <Grid item>
                            <CardContent>
                                <Typography variant="h3" color="inherit">
                                    {props.username}
                                </Typography>
                                <Typography variant="h5">
                                    {props.name}
                                </Typography>
                                <Typography variant="body1" gutterBottom>
                                    {props.email}
                                </Typography>
                                <Typography variant="body1" component="p">
                                    This is my bio!
                                </Typography>
                                <Typography className={classes.posBottom} variant="body2" color="textSecondary">
                                    Member since {date.toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                                </Typography>
                            </CardContent>
                        </Grid>
                    </Grid>
                </Card>
            </Box>
        </div>
    );
}

export default Profile;
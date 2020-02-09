import React from 'react';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

//Style
const useStyles = makeStyles({
    root: {
      minWidth: 275
    },
    body: {
      display: 'flex',
      justifyContent: 'center'
    },
    pos: {
      marginBottom: 12,
    },
});

function Profile(props) {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.body} variant="h3" color="inherit">
                        Welcome to my user profile!
                    </Typography>
                    <Typography className={classes.body} variant="body1">
                        Username: {props.username}
                    </Typography>
                    <Typography className={classes.body} variant="body1">
                        Email: {props.email}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default Profile;
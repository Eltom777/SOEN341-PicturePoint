//React
import React from 'react';
import {Link} from 'react-router-dom';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

//Style
const useStyles = makeStyles({
    paper: {
        padding: 10,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        minHeight: 500, 
        width: 900,
    },
    paperImage: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
    },
    card: {
        marginTop: 10,
        height: 240,
        width: 240
    },
    image: {
        height: 240,
        width: 240
    }
});

function Photos(props) {
    const classes = useStyles();

    var photos = props.photos;
    var button;

    if(props.isCurrentUser) {
        button = (
            <Button className={classes.followButton} variant="contained" color="primary" component={Link} to={`/${props.username}/Photos/AddPhoto`}>
                Upload an image
            </Button>
        );
    } else {
        button = null;
    }

    return(
        <div>
            <Box display="flex" justifyContent="center">
                <Paper className={classes.paper} elevation={3}>
                    <Grid container>
                        <Grid item xs />
                        <Grid item>
                            {button}
                        </Grid>
                    </Grid>
                    <Paper className={classes.paperImage} elevation={0}>
                        {photos.map(photo => (
                            <Card className={classes.card}>
                                <CardActionArea component={Link} to={`/${props.username}/Photos/${photo.photoID}`}>
                                    <CardMedia className={classes.image} image={photo.imageUrl} />  
                                </CardActionArea>
                            </Card>
                        ))}
                    </Paper>
                </Paper>
            </Box>
        </div>
    );
}

export default Photos; 
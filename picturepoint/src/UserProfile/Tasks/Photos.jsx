//React
import React, { useState, useEffect, Fragment } from 'react';
import {Link} from 'react-router-dom';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

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
        overflow: 'auto',

    },
    paperImage: {
        marginTop: 10,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    },
    card: {
        height: 360,
        width: 360
    },
    image: {
        height: 360,
        width: 360
    }
});

function Photos(props) {
    const classes = useStyles();

    //Runs fecthing 
    useEffect(() => {
        fetchPhotos();
    }, []);

    //User data & User initial & User index
    const [photos, setPhotos] = useState([]);
    const currentUserID = props.currentUserID;
    
    //Function to get user from Firebase api
    const fetchPhotos = async () => {
        const data = await fetch('https://us-central1-picturepoint-381cf.cloudfunctions.net/api/getPhoto');
        const photos = await data.json();

        //For Test
        console.log(photos);
        
        setPhotos(photos);
    }

    //Date variable 
    //var date = new Date(photo.creationDate);

    return(
        <div>
            <Box display="flex" justifyContent="center">
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h4" align="center">
                        Posts
                   </Typography>
                   <Paper className={classes.paperImage} elevation={0}>
                        {photos.map(photo => (
                            <Card className={classes.card}>
                                <CardActionArea component={Link} to={`/Photos/${photo.photoID}`}>
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
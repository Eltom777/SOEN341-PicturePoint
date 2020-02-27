//React
import React, { useState, useEffect, Fragment } from 'react';
import {Link} from 'react-router-dom';

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
        height: 800, 
        width: 900,
        overflow: 'auto',

    }
});

function Picture({ match }) {
    const classes = useStyles();

    //Runs fecthing 
    useEffect(() => {
        fetchPhoto();
        console.log(match);
    }, []);

    //User data & User initial & User index
    const [photo, setPhoto] = useState({});

    //Selects photo's index
    const selectPhoto = (photos) => {
        var index;
        for (var i = 0; i < photos.length; i++){
            if(photos[i].photoID === match.params.id){
                index = i;
                break;
            }
        }
        return index;
    }
    
    //Function to get user from Firebase api
    const fetchPhoto = async () => {
        const data = await fetch('https://us-central1-picturepoint-381cf.cloudfunctions.net/api/getPhoto');
        const photos = await data.json();

        //For Test
        console.log(photos);
        
        setPhoto(photos[selectPhoto(photos)]);
    }

    return(
        <div>
            <Box display="flex" justifyContent="center">
                <Paper className={classes.paper} elevation={3}>
                    <Typography variant="h4" align="center">
                        Posts
                   </Typography>
                    <img src={photo.imageUrl} />
                    <Typography variant="h4" align="center">
                        {photo.caption}
                   </Typography>
                </Paper>
            </Box>
        </div>
    );
}

export default Picture; 
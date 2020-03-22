//React
import React, { useState, useEffect, Fragment } from 'react';

//Firebase function
import { getPhoto } from '../Firebase/functions/getPhoto';
import { getComments } from '../Firebase/functions/getComments';

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
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
        minHeight: 500, 
        width: 900,
        overflow: 'auto',

    }
});

function Picture({ match }) {
    const classes = useStyles();
    
    const [photo, setPhoto] = useState({});
    const [comments, setComments] = useState([]);
    var photoID = match.params.id;

    //Runs fecthing 
    useEffect(() => {
        fetchPhoto();
        fetchComments();
        console.log(match);
    }, []);

    const fetchPhoto = async () => {
        getPhoto(photoID, (data) => {
            setPhoto(data);
        });
    }

    const fetchComments = async () => {
        getComments(photoID, (data) => {
            setComments(data);
        });
    }

    //This page should include the caption, likes and comments --> Assign Jordan
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
                   {comments.map(comment => (
                        <Fragment>
                            <List component="nav">
                                <ListItem button>
                                    <ListItemText secondary={comment.body} primary={comment.username} />
                                </ListItem>
                            </List>
                        </Fragment>
                    ))}
                </Paper>
            </Box>
        </div>
    );
}

export default Picture; 
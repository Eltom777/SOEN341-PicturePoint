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
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from "@material-ui/core/TextField";

//Components
import CommentForm from './CommentForm'
import { typography } from '@material-ui/system';

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

    },
    paperImage: {
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        height: 'auto',
        width: 720
    },
    image: {
        height: 720,
        width: 720
    }
});

function Picture({ match }) {
    const classes = useStyles();
    
    const [photo, setPhoto] = useState({});
    const [comments, setComments] = useState([]);
    var photoID = match.params.id;
    var username = localStorage.getItem("username");
    var date = new Date(photo.creationDate);

    //Runs fecthing 
    useEffect(() => {
        fetchPhoto();
        fetchComments();
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
                   <Paper className={classes.paperImage} elevation={0}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                <Avatar>
                                    {null}
                                </Avatar>
                                }
                                title={photo.user}
                                subheader={date.toLocaleString("en-US", { day: "numeric", month: "long", year: "numeric" })}
                            />
                            <CardMedia className={classes.image} image={photo.imageUrl} />
                            <IconButton aria-label="Like!">
                                <FavoriteIcon />
                            </IconButton>
                            <CardContent>
                                <Typography variant="body1" color="" component="p" align="left">
                                    {photo.caption}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                   <CommentForm username={username} photoID={photoID} />
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
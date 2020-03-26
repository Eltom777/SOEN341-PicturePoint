//React
import React, { useState, useEffect, Fragment } from 'react';

//Relative time (Dayjs)
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

//Components
import CommentForm from './CommentForm'

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
        display: 'flex',
        justifyContent: 'center',
        overflow: 'auto',
    },
    card: {
        backgroundColor: '#f2eee5',
        height: 'auto',
        width: 720
    },
    image: {
        height: 720,
        width: 720
    },
    caption: {
        marginBottom: 15
    }
});

function Picture({ match }) {
    const classes = useStyles();
    
    const [photo, setPhoto] = useState({});
    const [comments, setComments] = useState([]);
    var photoID = match.params.id;
    var username = localStorage.getItem("username");
    var date = new Date(photo.creationDate);
    dayjs.extend(relativeTime);

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
                <Paper className={classes.paper} elevation={0}>
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
                            <IconButton aria-label="Like!" align="left">
                                <FavoriteIcon />
                            </IconButton>
                            <CardContent>
                                <Typography className={classes.caption} variant="body1" color="" component="p" align="left">
                                    {photo.caption}
                                </Typography>
                            <CommentForm username={username} photoID={photoID} />
                            {comments.map(comment => (
                                    <Fragment>
                                        <List component="nav">
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar />
                                                </ListItemAvatar>
                                                <ListItemText primary={comment.username} secondary={
                                                    <Fragment>
                                                        <Typography variant="body1" >
                                                            {comment.body}
                                                        </Typography>
                                                        <Typography variant="subtitle2" align="right">
                                                            {dayjs(comment.createdAt).fromNow()}
                                                        </Typography>
                                                    </Fragment>
                                                }/>
                                            </ListItem>
                                            <Divider variant="fullWidth" component="li" />
                                        </List>
                                    </Fragment>
                            ))}
                        </CardContent>
                    </Card>
                </Paper>
            </Box>
        </div>
    );
}

export default Picture; 
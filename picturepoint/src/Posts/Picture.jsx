//React
import React, { useState, useEffect, Fragment } from 'react'

//Relative time (Dayjs)
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//Firebase function
import { getPhoto } from '../Firebase/functions/getPhoto'
import { getComments } from '../Firebase/functions/getComments'
import { checkLike } from '../Firebase/functions/checkLike'
import { likePost } from '../Firebase/functions/likePhoto'
import { unlikePost } from '../Firebase/functions/unlikePhoto'
import { deletePhoto } from '../Firebase/functions/deletePhoto'

//Material UI
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'

//Components
import CommentForm from './CommentForm'

//Style
const useStyles = makeStyles({
    paper: {
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        minHeight: 500,
        display: 'flex',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: 'white',
        height: 'auto',
        width: 1200,
    },
    cardContent: {
        width: 480,
    },
    comments: {
        marginTop: 5,
        maxHeight: 500,
        overflow: 'auto',
    },
    image: {
        height: 720,
        width: 720,
    },
    caption: {
        marginBottom: 15,
    },
})

function Picture({ match }) {
    const classes = useStyles()

    const [state, setState] = useState({
        isLiked: false,
    })
    const [photo, setPhoto] = useState({})
    const [comments, setComments] = useState([])
    var photoID = match.params.id
    var username = localStorage.getItem('username')
    var date = new Date(photo.creationDate)
    var button
    var deleteButton

    //Relative time
    dayjs.extend(relativeTime)

    //Runs fecthing
    useEffect(() => {
        fetchPhoto()
        fetchComments()
        fetchIsLiked()
    }, [])

    const fetchPhoto = async () => {
        getPhoto(photoID, (data) => {
            setPhoto(data)
        })
    }

    const fetchComments = async () => {
        getComments(photoID, (data) => {
            setComments(data)
        })
    }

    const fetchIsLiked = async () => {
        checkLike(photoID, username, (data) => {
            setState({
                isLiked: data,
            })
        })
    }

    const unlikePhoto = (e) => {
        e.preventDefault()
        unlikePost(photoID, username, photo)
        setState({
            isLiked: false,
        })
    }

    const likePhoto = (e) => {
        e.preventDefault()
        const newLike = {
            photo: photoID,
            user: username,
        }
        likePost(newLike, photoID, photo)
        setState({
            isLiked: true,
        })
    }

    const handleDelete = (e) => {
        e.preventDefault()
        deletePhoto(photoID, (callback) => {
            alert(callback)
        })
        window.open(`/${username}`, '_self')
    }

    if (state.isLiked) {
        button = (
            <IconButton aria-label="unlike" align="left" onClick={unlikePhoto}>
                <FavoriteIcon color="secondary" />
                <Typography>{photo.likes}</Typography>
            </IconButton>
        )
    } else {
        button = (
            <IconButton aria-label="like" align="left" onClick={likePhoto}>
                <FavoriteIcon color="default" />
                <Typography>{photo.likes}</Typography>
            </IconButton>
        )
    }

    if (username === match.params.username) {
        deleteButton = (
            <IconButton
                aria-label="delete"
                align="right"
                onClick={handleDelete}
            >
                <DeleteForeverIcon color="secondary" />
            </IconButton>
        )
    } else {
        deleteButton = null
    }

    return (
        <div>
            <Box display="flex" justifyContent="center">
                <Paper className={classes.paper}>
                    <Card className={classes.card}>
                        <Grid container>
                            <Grid item>
                                <CardMedia
                                    className={classes.image}
                                    image={photo.imageUrl}
                                />
                                {button}
                            </Grid>
                            <Grid item className={classes.cardContent}>
                                <CardHeader
                                    avatar={<Avatar>{null}</Avatar>}
                                    title={photo.user}
                                    subheader={date.toLocaleString('en-US', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })}
                                    action={deleteButton}
                                />
                                <CardContent>
                                    <Typography
                                        className={classes.caption}
                                        variant="body1"
                                        color=""
                                        component="p"
                                        align="left"
                                    >
                                        {photo.caption}
                                    </Typography>
                                    <CommentForm
                                        username={username}
                                        photoID={photoID}
                                    />
                                    <Box className={classes.comments}>
                                        {comments.map((comment) => (
                                            <Fragment>
                                                <List component="nav">
                                                    <ListItem>
                                                        <ListItemAvatar>
                                                            <Avatar />
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={
                                                                comment.username
                                                            }
                                                            secondary={
                                                                <Fragment>
                                                                    <Typography variant="body1">
                                                                        {
                                                                            comment.body
                                                                        }
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="subtitle2"
                                                                        align="right"
                                                                    >
                                                                        {dayjs(
                                                                            comment.createdAt
                                                                        ).fromNow()}
                                                                    </Typography>
                                                                </Fragment>
                                                            }
                                                        />
                                                    </ListItem>
                                                    <Divider
                                                        variant="fullWidth"
                                                        component="li"
                                                    />
                                                </List>
                                            </Fragment>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                </Paper>
            </Box>
        </div>
    )
}

export default Picture

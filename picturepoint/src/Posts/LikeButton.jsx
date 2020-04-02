//React
import React, { Component } from "react";

//Firebase
import { checkLike } from '../Firebase/functions/checkLike';
import { likePost } from "../Firebase/functions/likePhoto";
import { unlikePost } from "../Firebase/functions/unlikePhoto";

//Material-UI
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

class LikeButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photoID: this.props.photoID,
            username: this.props.username,
            likes: this.props.likes,
            isLiked: false
        };

        console.log(this.state);
    }

    unlikePhoto(e) {
        e.preventDefault();
        console.log("unliking");
        unlikePost(this.props.photoID, this.props.username, this.props.photo);
    }

    likePhoto(e) {
        e.preventDefault();
        console.log("liking");
        const newLike = {
            photo: this.props.photoID,
            user: this.props.username
        };
        likePost(newLike, this.props.photoID, this.props.photo);
    }

    render() {
        if(false) {
            return (
                <IconButton aria-label="unlike" align="left" onClick={this.unlikePhoto}>
                    <FavoriteIcon color="secondary" />
                    <Typography>
                        {this.props.photo.likes}
                    </Typography>
                </IconButton>
            );
        } else {
            return (
                <IconButton aria-label="like" align="left" onClick={this.likePhoto}>
                    <FavoriteIcon color="default" />
                    <Typography>
                        {this.props.photo.likes}
                    </Typography>
                </IconButton>
            );
        }
    }
}

export default LikeButton;
import React from 'react'
import { db, auth } from '../Firebase/functions/firebase'

import { Button } from '@material-ui/core';

class IsFollowing extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isFollowing: false };
        console.log(this.props.username);
        this.updateIsFollowing();
    }

    updateIsFollowing = () => {
        console.log('mounted')
        db.collection('links')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().following == localStorage.getItem("username") && doc.data().followed == this.props.username) { //username of the user //username of other user
                        this.setState({
                            isFollowing: true
                        })
                    }
                })
                console.log(snapshot);
            }).catch(error => console.log(error))
    }

    removeLink = () => {
        db.collection('links')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().following == localStorage.getItem("username")
                        && doc.data().followed == this.props.username) {
                        
                        let id = doc.id;
                        db.collection('links').doc(id).delete();
                    }
                })
                console.log(snapshot)
            }).catch(error => console.log(error))
        
        this.setState({
            isFollowing: false
        })
    }

    addLink = () => {
        db.collection('links')
            .add({
                followed: this.props.username, //person being followed
                following: localStorage.getItem("username") //person that is following
            })

        this.setState({
            isFollowing: true
        })
    }

    render() {
        let isFollowing = this.state.isFollowing;
        let button;
        if (isFollowing) {
            button = (
                <div className="UnfollowUser">
                    <Button onClick={this.removeLink} variant="contained" color="secondary.secondary" >
                        UNFOLLOW
                    </Button>
                </div>
            );
        } else {
            button = (
                <div className="FollowUser">
                    <Button onClick={this.addLink} variant="contained" color="primary">
                        FOLLOW
                    </Button>
                </div>
            );
        }

        return (
            <div>
                {button}
            </div>
        )
    }
}

export default IsFollowing;
import React from 'react'
import { db, auth } from '../Firebase/functions/firebase'

import { Button } from '@material-ui/core';

class IsFollowing extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isFollowing: false }; // initialized state of variable
        console.log(this.props.username);
        this.updateIsFollowing();
    }

    updateIsFollowing = () => {
        console.log('mounted')
        db.collection('links') // get the collection 'link' in firestore
            .get()
            .then(snapshot => {
                // go through each link
                snapshot.forEach(doc => {
                    // search for link if between logged in user is following displayed profile user
                    // if link exists, set state of isFollowing to true to render right button: "follow" or "unfollow"
                    if (doc.data().following == localStorage.getItem("username") // displayed profile user
                        && doc.data().followed == this.props.username) { // logged in user
                        this.setState({
                            isFollowing: true
                        })
                    }
                })
                console.log(snapshot);
            }).catch(error => console.log(error))
    }

    // remove a link to the collection 'links' which keeps track of following and followed relations
    // represents the action of "unfollowing a user"
    removeLink = () => {
        db.collection('links') // get the collection 'link' in firestore
            .get()
            .then(snapshot => {
                // go through each link
                snapshot.forEach(doc => {
                    // search for link if between logged in user is following displayed profile user: remove it
                    if (doc.data().following == localStorage.getItem("username") // displayed profile user
                        && doc.data().followed == this.props.username) { // logged in user

                        let id = doc.id;
                        db.collection('links').doc(id).delete();
                    }
                })
                console.log(snapshot)
            }).catch(error => console.log(error))

        // change the state of isFollowing to false
        // update button from "unfollow" to "follow"
        this.setState({
            isFollowing: false
        })
    }

    // add a link to the collection 'links' which keeps track of following and followed relations
    // represents the action of "following a user"
    addLink = () => {
        // append link object to document 'links'
        db.collection('links') // get the collection 'link' in firestore
            .add({
                followed: this.props.username, // logged in user
                following: localStorage.getItem("username") // displayed profile user
            })

        // change the state of isFollowing to true
        // update button from "follow" to "unfollow"
        this.setState({
            isFollowing: true
        })
    }

    render() {
        let isFollowing = this.state.isFollowing;
        let button;
        // render a different button depending wether the logged in user already follows or not the displayed profile user
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
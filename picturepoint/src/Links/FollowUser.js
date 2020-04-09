import React from 'react'
import { db, auth } from '../Firebase/functions/firebase'

class FollowUser extends React.Component {
    constructor(props) {
        super(props)
    }

    // add a link to the collection 'links' which keeps track of following and followed relations
    // represents the action of "following a user"
    addLink = () => {
        db.collection('links') // get the collection 'link' in firestore
            .add({
                followed: this.props.username, //logged in user
                following: localStorage.getItem('username'), //shown profile user
            })
    }

    checkDuplicate = () => {
        db.collection('links') // get the collection 'link' in firestore
            .get()
            .then((snapshot) => {
                snapshot.forEach((doc) => {
                    if (snapshot.exists) {
                        let id = doc.id
                        db.collection('links').doc(id).delete()
                    }
                })
                console.log(snapshot)
            })
            .catch((error) => console.log(error))
    }

    render() {
        return (
            <div className="FollowUser">
                <button onClick={this.addLink}>FOLLOW</button>
            </div>
        )
    }
}

export default FollowUser

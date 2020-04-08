import React from 'react'
import { db, auth } from '../Firebase/functions/firebase'

class UnfollowUser extends React.Component {
    constructor(props) {
        super(props);
    }

    // remove a link to the collection 'links' which keeps track of following and followed relations
    // represents the action of "unfollowing a user"
    removeLink = () => {
        db.collection('links') // get the collection 'link' in firestore
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().following == localStorage.getItem("username") // shown profile user
                        && doc.data().followed == this.props.username) { //logged in user

                        let id = doc.id;
                        db.collection('links').doc(id).delete();
                    }
                })
                console.log(snapshot)
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="UnfollowUser">
                <button onClick={this.removeLink}>UNFOLLOW</button>
            </div>
        )
    }
}

export default UnfollowUser;
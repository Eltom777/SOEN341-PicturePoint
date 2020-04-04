import React from 'react'
import { db, auth } from '../Firebase/functions/firebase'

class FollowUser extends React.Component {

    addLink = () => {

        // db.collection('links').doc(doc.id)
        //     .get().then((docSnapshot) => {
        //         if (docSnapshot.exists) {
        //             db.collection('link').doc(doc.id).onSnapshot((doc) => {
        //                 db.collection('links').doc(doc.id).delete();
        //             });
        //         } else {
        //             db.collection('links')
        //                 .add({
        //                     followed: "t-flynn", //person being followed
        //                     following: "a-iacampo" //person that is following
        //                 })
        //         }
        //     });

        db.collection('links')
            .add({
                followed: "t-flynn", //person being followed
                following: "a-iacampo" //person that is following
            })
        // this.checkDuplicate();
    }

    checkDuplicate = () => {
        db.collection('links')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (snapshot.exists) {
                        let id = doc.id;
                        db.collection('links').doc(id).delete();
                    }
                });
                console.log(snapshot)
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="FollowUser">
                <button onClick={this.addLink}>FOLLOW</button>
            </div>
        )
    }
}

export default FollowUser;
import React from 'react'
import { db, auth } from '../Firebase/functions/firebase'

class UnfollowUser extends React.Component {

    removeLink = () => {
        db.collection('links')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().following == "a-iacampo"
                        && doc.data().followed == "t-flynn") {
                        
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
import React from 'react'
import { db, auth } from '../Firebase/functions/firebase'

import FollowUser from './FollowUser';
import UnfollowUser from './UnfollowUser';

class IsFollowing extends React.Component {

    constructor(props) {
        super(props);
        this.state = { isFollowing: false };
    }

    updateIsFollowing = () => {
        console.log('mounted')
        db.collection('links')
            .get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    if (doc.data().following == "a-iacampo" && doc.data().followed == "t-flynn") { //username of the user //username of other user
                        return true;
                    }
                })
                console.log(snapshot);
            }).catch(error => console.log(error))
        return false;
    }

    render() {
        const isFollowing = this.state.isFollowing;
        let button;
        if (isFollowing) {
            button = <UnfollowUser />;
        } else {
            button = <FollowUser />;
        }
        return (
            <div>
                {button}
            </div>
        )


        // return (
        //     <div className="GetFollowings">
        //         {
        //             this.isFollowing ? <UnfollowUser /> : <FollowUser />
        //         }
        //     </div>
        // )
    }
}

export default IsFollowing;
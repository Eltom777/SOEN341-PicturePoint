import React from 'react'
import {db, auth} from '../Firebase/functions/firebase'

class GetFollowings extends React.Component {
    state = {
        followings: null,
    }

    componentDidMount(){
        console.log('mounted')
        db.collection('links')
            .get()
            .then( snapshot => {
                const followings = [];
                snapshot.forEach( doc => {
                    if(doc.data().following == localStorage.getItem("username")) { //username of the user
                        const data = doc.data();
                        followings.push(data);
                    }
                })
                this.setState({followings: followings});
                console.log(snapshot);
            }).catch(error => console.log(error))
    }

    render(){
        return(
            <div className="GetFollowings">
                <h1>
                    {
                        this.state.followings && 
                        this.state.followings.map(links => {
                            return (
                                <div>
                                    <p>following: {links.followed}</p>
                                </div>
                            )
                        })
                    }
                </h1>
            </div>
        )
    }
}

export default GetFollowings;
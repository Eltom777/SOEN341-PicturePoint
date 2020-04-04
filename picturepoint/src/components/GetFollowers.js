import React from 'react'
import { db, auth } from '../Firebase/functions/firebase'

class GetFollowers extends React.Component {
    state = {
        followers: null,
    }

    // componentDidMount() {
    //     console.log('mounted');
    //     db.collection('links')
    //         .onSnapshot((doc) => {
    //             const followers = [];
    //             snapshot.forEach(doc => {
    //                 if (doc.data().followed == "t-flynn") { //username of the user
    //                     const data = doc.data()
    //                     followers.push(data)
    //                 }
    //             })
    //             this.setState({ followers: followers })
    //             console.log(snapshot)
    //         });
    // }

    componentDidMount() {
        console.log('mounted')
        db.collection('links')
            .get()
            .then(snapshot => {
                const followers = []
                snapshot.forEach(doc => {
                    if (doc.data().followed == "t-flynn") { //username of the user
                        const data = doc.data()
                        followers.push(data)
                    }
                })
                this.setState({ followers: followers })
                console.log(snapshot)
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div className="GetFollowers">
                <h1>
                    {
                        this.state.followers &&
                        this.state.followers.map(links => {
                            return (
                                <div>
                                    <p>follower: {links.following}</p>
                                </div>
                            )
                        })
                    }
                </h1>
            </div>
        )
    }
}

export default GetFollowers;
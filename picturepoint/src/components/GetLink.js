import React from 'react'
import {db, auth} from '../Firebase/functions/firebase'

class GetLink extends React.Component {
    state = {
        followers: null,
        follwings: null
    }

    componentDidMount(){
        console.log('mounted')
        db.collection('links')
            .get()
            .then( snapshot => {
                const followers = [] 
                const followings = []
                snapshot.forEach( doc => {
                    if(doc.data().following == "t-tran") {
                        const data1 = doc.data()
                        followers.push(data1)
                    }
                })
                snapshot.forEach( doc => {
                    if(doc.data().follower == "t-tran") {
                        const data2 = doc.data()
                        followings.push(data2)
                    }
                })
                this.setState({followers: followers})
                this.setState({followings: followings})
                console.log(snapshot)
            }).catch(error => console.log(error))
    }


    // componentDidMount(){
    //     console.log('mounted')
    //     db.collection('links')
    //         .get()
    //         .then( snapshot => {
    //             const links = [] 
    //             snapshot.forEach( doc => {
    //                 const data = doc.data()
    //                 links.push(data)
    //             })
    //             this.setState({links: links})
    //             console.log(snapshot)
    //         }).catch(error => console.log(error))
    // }

    addNewLink = () => {
        db.collection('links')
            .add({
                follower: "t-flynn",
                following: "t-tran"
            })
    }

    render(){
        return(
            <div className="GetLink">
                <h1>
                    <div>
                        <p>Follower:    <input/></p>
                        <p>Following:    <input/></p>
                    </div>
                    <button onClick={this.addNewLink}>Add new Link</button>
                    {
                        this.state.followers && 
                        this.state.followers.map(links => {
                            return (
                                <div>
                                    <p>follower: {links.follower}</p>
                                </div>
                            )
                        })
                    }
                    {
                        this.state.followings && 
                        this.state.followings.map(links => {
                            return (
                                <div>
                                    <p>following: {links.following}</p>
                                </div>
                            )
                        })
                    }
                </h1>
            </div>
        )
    }
}

export default GetLink;
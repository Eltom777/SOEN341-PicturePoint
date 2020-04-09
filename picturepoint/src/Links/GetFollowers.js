import React, { Fragment } from 'react'
import { db, auth } from '../Firebase/functions/firebase'
import { Link } from 'react-router-dom'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

class GetFollowers extends React.Component {
    // initialized state of variable
    state = {
        followers: null,
    }

    componentDidMount() {
        // is called when the component GetFollowers is rendered
        console.log('mounted')
        db.collection('links') // get the collection 'link' in firestore
            .onSnapshot((snapshot) => {
                const followers = [] // initialize array to hold following users
                snapshot.forEach((doc) => {
                    // search for link if between logged in user is followed by other users
                    // if found, append to array
                    if (doc.data().followed == this.props.username) {
                        //username of logged in user
                        const data = doc.data() // get data
                        followers.push(data) // push data into array
                    }
                })
                this.setState({ followers: followers }) // set the state of variable
                console.log(snapshot)
            })
    }

    render() {
        return (
            <div>
                {this.state.followers &&
                    this.state.followers.map((links) => (
                        <Fragment>
                            <List component="nav">
                                <ListItem
                                    button
                                    component={Link}
                                    to={`/${links.following}`}
                                >
                                    <ListItemAvatar>
                                        <Avatar>{links.following[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={links.following} />
                                </ListItem>
                            </List>
                        </Fragment>
                    ))}
            </div>
        )
    }
}

export default GetFollowers

import React, { Fragment } from 'react'
import { db, auth } from '../Firebase/functions/firebase'
import { Link } from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

class GetFollowings extends React.Component {
    // initialized state of variable
    state = {
        followings: null,
    }

    componentDidMount() { // is called when the component GetFollowings is rendered
        console.log('mounted')
        db.collection('links') // get the collection 'link' in firestore
            .onSnapshot(snapshot => {
                const followings = []; // initialize array to hold followed users
                snapshot.forEach(doc => {
                    // search for link if between logged in user is following other users
                    // if found, append to array
                    if (doc.data().following == this.props.username) { //username of logged in user
                        const data = doc.data(); // get data
                        followings.push(data); // push data into array
                    }
                })
                this.setState({ followings: followings }); // set the state of variable
                console.log(snapshot);
            });
    }

    render() {
        return (
            <div>
                {this.state.followings &&
                    this.state.followings.map(links => (
                        <Fragment>
                            <List component="nav">
                                <ListItem button component={Link} to={`/${links.followed}`}>
                                    <ListItemAvatar>
                                        <Avatar>{links.followed[0]}</Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={links.followed} />
                                </ListItem>
                            </List>
                        </Fragment>
                    ))}
            </div>
        )
    }
}

export default GetFollowings;
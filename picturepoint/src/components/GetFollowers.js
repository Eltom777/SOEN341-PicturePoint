import React, {Fragment} from 'react'
import { db, auth } from '../Firebase/functions/firebase'
import {Link} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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
            .onSnapshot(snapshot => {
                const followers = []
                snapshot.forEach(doc => {
                    if (doc.data().followed == this.props.username) { //username of the user
                        const data = doc.data()
                        followers.push(data)
                    }
                })
                this.setState({ followers: followers })
                console.log(snapshot)
            });
    }

    render() {
        return (
            <div>
            {this.state.followers && this.state.followers.map(links => (
                <Fragment>
                    <List component="nav">
                        <ListItem button component={Link} to={`/${links.following}`}>
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

export default GetFollowers;
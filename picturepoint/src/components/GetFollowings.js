import React, {Fragment} from 'react'
import { db, auth } from '../Firebase/functions/firebase'
import {Link} from 'react-router-dom';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

class GetFollowings extends React.Component {
    state = {
        followings: null,
    }

    componentDidMount(){
        console.log('mounted')
        db.collection('links')
            .onSnapshot( snapshot => {
                const followings = [];
                snapshot.forEach( doc => {
                    if(doc.data().following == this.props.username) { //username of the user
                        const data = doc.data();
                        followings.push(data);
                    }
                })
                this.setState({followings: followings});
                console.log(snapshot);
            });
    }

    render(){
        return(
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
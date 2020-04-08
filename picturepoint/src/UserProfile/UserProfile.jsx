//React
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

//Firebase functions
import { getUser } from '../Firebase/functions/getUser';
import { getPhotos } from '../Firebase/functions/getPhotos';

//Routes
import * as routes from "../Routes/routes";

//Components
import ProfileCard from './components/ProfileCard';
import Taskbar from '../Layouts/Taskbar';
import Friends from './components/Taskbar Components/Friends';
import Photos from './components/Taskbar Components/Photos';
import Picture from '../Posts/Picture';
import AddPhoto from '../AddPhoto/AddPhoto';
import Account from '../Login/components/Account';

export default class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {ready: false};

        //Load first time
        this.getUserData();
    }

    //Update when data changes
    componentDidUpdate() {
        //If statement prevents re-fetching
        if (this.props.match.params.username !== this.state.username) {
            this.getUserData();
        }
    }

    //Fetch user data
    getUserData() {
        getUser(this.props.match.params.username, (userData) => {
            getPhotos(this.props.match.params.username, (data) => {
                this.setState({...userData, photos: data, ready: true});
            });
        });
    }

    //Render
    render = function() {
        if(this.state.ready === false)
            return <div></div>;
        
        //Current URL location 
        var location = window.location.pathname.split('/');

        //Render main page/Route to all other pages
        return (
            <div>
                <ProfileCard currentUser={this.state} isCurrentUser={localStorage.getItem("username") === this.state.username} />
                <Taskbar state={location[location.length - 1]} username={this.state.username} />
                <Switch>
                    <Route exact path={routes.ACCOUNT} component={Account} />
                    <Route exact path={routes.FRIEND} render={() => <Friends username={this.state.username} />} />
                    <Route exact path={routes.HOME} render={() => <Photos photos={this.state.photos} username={this.state.username} isCurrentUser={localStorage.getItem("username") === this.state.username} />} />
                    <Route exact path={routes.ADD_PHOTO} component={AddPhoto} />
                    <Route exact path={routes.PHOTO_ID} component={Picture} />
                </Switch>
            </div>
        );
    }
}
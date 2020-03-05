//React
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import ProfileCard from './ProfileCard';

//Layout
import Taskbar from '../Layouts/Taskbar';

//Taskbar Components
import Friends from './Taskbar Components/Friends';
import Photos from './Taskbar Components/Photos';

//Pages
import Picture from '../Posts/Picture';
import AddPhoto from '../AddPhoto';

function UserProfile() {
    //Enter the user ID of the user profile you want to load
    var currentUserID = 't-flynn'

    //Renders the main user profile page
    return (
        <div>
            <Router>
                <ProfileCard currentUserID={currentUserID} />
                <Taskbar />
                <Switch>
                    <Route exact path="/Friends" component={Friends} />
                    <Route exact path="/Photos" render={(props) => <Photos currentUserID={currentUserID} />} />
                    <Route exact path="/Photos/AddPhoto" component={AddPhoto} />
                    <Route exact path="/Photos/:id" component={Picture} />
                </Switch>
            </Router>
        </div>
    );
}

export default UserProfile;
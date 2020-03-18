//React
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

//Firebase function
import { getUser } from '../Firebase/functions/getUser';
import { getPhotos } from '../Firebase/functions/getPhotos';

//Routes
import * as routes from "../Routes/routes";

//Components
import ProfileCard from './components/ProfileCard';

//Layout
import Taskbar from '../Layouts/Taskbar';

//Taskbar Components
import Friends from './components/Taskbar Components/Friends';
import Photos from './components/Taskbar Components/Photos';

//Pages
import Picture from '../Posts/Picture';
import AddPhoto from '../AddPhoto/AddPhoto';
import Account from '../Login/components/Account';

function UserProfile(props) {
    const [user, setUser] = useState({});
    const [photos, setPhotos] = useState([]);
    const loginEmail = props.loginEmail;

    //Runs fecthing 
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        getUser(loginEmail, (data) => {
            setUser(data);
            getPhotos(data.username, (photoData) => {
                setPhotos(photoData);
            });
        });
    }

    //Current URL location 
    var location = window.location.pathname.split('/');

    //Renders the main user profile page
    return (
        <div>
            <ProfileCard currentUser={user} />
            <Taskbar state={location[location.length - 1]} />
            <Switch>
                <Route exact path={routes.ACCOUNT} component={Account} />
                <Route exact path={routes.FRIEND} component={Friends} />
                <Route exact path={routes.HOME} render={(props) => <Photos photos={photos} />} />
                <Route exact path={routes.ADD_PHOTO} component={AddPhoto} />
                <Route exact path={routes.PHOTO_ID} component={Picture} />
            </Switch>
        </div>
    );
}

export default UserProfile;
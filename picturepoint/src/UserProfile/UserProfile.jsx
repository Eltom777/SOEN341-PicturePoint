//React
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

//Routes
import * as routes from "../Routes/routes";

//Components
import ProfileCard from './ProfileCard';

//Layout
import Taskbar from '../Layouts/Taskbar';

//Taskbar Components
import Friends from './Taskbar Components/Friends';
import Photos from './Taskbar Components/Photos';

//Pages
import Picture from '../Posts/Picture';
import AddPhoto from '../AddPhoto/AddPhoto';
import Account from '../Login/components/Account';

function UserProfile(props) {
    //User data & User ID & User initial & Login user email
    const [user, setUser] = useState({});
    const [currentUserID, setUserID] = useState("");
    const [initial, setInitial] = useState("");
    const loginEmail = props.loginEmail;

    //Selects user's index
    const selectUser = (users, email) => {
        var index;
        for (var i = 0; i < users.length; i++){
            if(users[i].email === email){
                index = i;
                break;
            }
        }
        return index;
    }

    //Runs fecthing 
    useEffect(() => {
        fetchUser();
    }, []);
    
    //Function to get user from Firebase api
    const fetchUser = async () => {
        const data = await fetch('https://us-central1-picturepoint-381cf.cloudfunctions.net/api/getUser');
        const users = await data.json();

        //For Test
        console.log(users); 

        setUser(users[selectUser(users, loginEmail)]);
        setUserID(users[selectUser(users, loginEmail)].username);
        setInitial(users[selectUser(users, loginEmail)].name[0]);
    }

    //Renders the main user profile page
    return (
        <div>
            <ProfileCard currentUser={user} userInitial={initial} />
            <Taskbar />
            <Switch>
                <Route exact path={routes.ACCOUNT} component={Account} />

                <Route exact path={routes.FRIEND} component={Friends} />
                <Route exact path={routes.PHOTO} render={(props) => <Photos currentUserID={currentUserID} />} />
                <Route exact path={routes.ADD_PHOTO} component={AddPhoto} />
                <Route exact path={routes.PHOTO_ID} component={Picture} />
            </Switch>
        </div>
    );
}

export default UserProfile;
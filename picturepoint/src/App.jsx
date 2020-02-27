//React
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Profile from './UserProfile/Profile';

//Layout
import Header from './Layouts/Header';
import Taskbar from './Layouts/Taskbar';

//Tasks
import Friends from './UserProfile/Tasks/Friends';
import Photos from './UserProfile/Tasks/Photos';

//Pages
import Picture from './Posts/Picture';

function App() {
    //Enter the user ID of the user profile you want to load
    var currentUserID = 't-flynn'

    //Renders the main user profile page
    return (
        <div>
            <Router>
                <Header />
                <Profile currentUserID={currentUserID} />
                <Taskbar />
                <Switch>
                    <Route exact path="/" component={Friends} />
                    <Route exact path="/Photos" render={(props) => <Photos currentUserID={currentUserID} />} />
                    <Route exact path="/Photos/:id" component={Picture} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
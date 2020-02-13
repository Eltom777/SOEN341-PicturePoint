//React
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Components
import Profile from './UserProfile/Profile';

//Layout
import Header from './Layouts/Header';
import Taskbar from './Layouts/Taskbar';

//Tasks
import Friends from './UserProfile/Tasks/Friends';
import Photos from './UserProfile/Tasks/Photos';

//Functions
import { getUser } from './Functions/DataProcessor';

function App() {
    //Temp data
    const [currentUser] = useState(getUser);

    return (
        <div>
            <Router>
                <Header />
                {currentUser.map(user => (
                    <Profile username={user.username} email={user.email} name={user.name} creationDate={user.creationDate} />
                ))}
                <Taskbar />
                <Switch>
                    <Route exact path="/" component={Friends} />
                    <Route exact path="/photos" component={Photos} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
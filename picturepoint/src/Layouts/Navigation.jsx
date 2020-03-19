//React
import React from "react";
import { Route } from 'react-router-dom';

//Authentication
import AuthUserContext from "../Login/components/AuthUserContext";

//Layouts
import Header from "../Layouts/Header";
import AuthHeader from "../Layouts/AuthHeader";

//Pages
import Login from "../Login/Login";
import UserProfile from "../UserProfile/UserProfile";
import Friend from '../Friend';

//Routes
import * as routes from "../Routes/routes";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      authUser ? <NavigationAuth email={authUser.email} /> : <NavigationNonAuth /> 
    )}
  </AuthUserContext.Consumer>
);

const NavigationAuth = (props) => (
  <div>
    <AuthHeader />
    <UserProfile loginEmail={props.email} />
    <Route exact path={routes.FRIEND_ID} component={Friend} />
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <Header />
    <Login />
  </div>
);

export default Navigation;
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

//Routes
import * as routes from "../Routes/routes";

const Navigation = () => {
  return(
  <AuthUserContext.Consumer>
    {authUser => (
      authUser ? <NavigationAuth /> : <NavigationNonAuth /> 
    )}
  </AuthUserContext.Consumer>
  )};

const NavigationAuth = () => (
  <div>
    <AuthHeader />
    <Route path={routes.HOME} component={UserProfile} />
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <Header />
    <Login />
  </div>
);

export default Navigation;
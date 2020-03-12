//React
import React from "react";

//Authentication
import AuthUserContext from "./Login/components/AuthUserContext";

//Layouts
import Login from "./Login/Login";
import UserProfile from "./UserProfile/UserProfile";

//**Possibly pass authUser.email

//Enter the user ID of the user profile you want to load
var currentUserID = 't-flynn';

const CheckAuth = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <Auth /> : <NonAuth />)}
  </AuthUserContext.Consumer>
);

const Auth = () => (
    <UserProfile currentUserID={currentUserID} />
);

const NonAuth = () => (
    <Login />
);

export default CheckAuth;
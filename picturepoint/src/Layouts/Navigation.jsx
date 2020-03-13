//React
import React from "react";

//Authentication
import AuthUserContext from "../Login/components/AuthUserContext";

//Layouts
import Header from "../Layouts/Header";
import AuthHeader from "../Layouts/AuthHeader";

//Pages
import Login from "../Login/Login";
import UserProfile from "../UserProfile/UserProfile";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (
      authUser ? <NavigationAuth email={authUser.email} /> : <NavigationNonAuth /> 
    )}
  </AuthUserContext.Consumer>
);

const NavigationAuth = (props) => (
  <div>
      {console.log(props.email)}
    <AuthHeader />
    <UserProfile loginEmail={props.email} />
  </div>
);

const NavigationNonAuth = () => (
  <div>
    <Header />
    <Login />
  </div>
);

export default Navigation;
//React
import React from "react";

//Authentication
import AuthUserContext from "../Login/components/AuthUserContext";

//Layouts
import Header from "../Layouts/Header";
import AuthHeader from "../Layouts/AuthHeader";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <div>
    <AuthHeader />
  </div>
);

const NavigationNonAuth = () => (
  <Header />
);

export default Navigation;
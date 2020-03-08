import React from "react";
import { Link } from "react-router-dom";

import AuthUserContext from "./AuthUserContext";
import SignOutButton from "./SignOut";
import * as routes from "../constants/routes";

import Header from "../../Layouts/Header";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
  </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
  <div>
  <Header />
  <ul>
    <li>
      <Link to={routes.HOME}>Home</Link>
    </li>
    <li>
      <Link to={routes.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
  </div>
);

const NavigationNonAuth = () => <Link to={routes.SIGN_IN}>Sign In</Link>;

export default Navigation;
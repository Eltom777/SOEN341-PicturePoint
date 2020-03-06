//React
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//Layout
import Header from './Layouts/Header';

//Pages
import UserProfile from './UserProfile/UserProfile';

//
import Navigation from "./Login/components/Navigation";
import SignUpPage from "./Login/components/SignUp";
import SignInPage from "./Login/components/SignIn";
import PasswordForgetPage from "./Login/components/PasswordForget";
import HomePage from "./Login/components/Home";
import AccountPage from "./Login/components/Account";
import withAuthentication from "./Login/components/withAuthentication";

import * as routes from "./Login/constants/routes";

//Enter the user ID of the user profile you want to load
var currentUserID = 't-flynn';

const App = () => (
  <Router>
    <div>
      <Navigation />
      <hr />
      <Route exact path={routes.SIGN_UP} component={SignUpPage} />
      <Route exact path={routes.SIGN_IN} component={SignInPage} />
      <Route
        exact
        path={routes.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route exact path={routes.HOME} render={(props) => <UserProfile currentUserID={currentUserID} />} />
      <Route exact path={routes.ACCOUNT} component={AccountPage} />
    </div>
  </Router>
);

export default withAuthentication(App);
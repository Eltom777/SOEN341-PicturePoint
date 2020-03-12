//React
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

//Layout
import Header from './Layouts/Header';

//Pages
import Navigation from "./Layouts/Navigation";
import CheckAuth from './CheckAuth';

import AccountPage from "./Login/components/Account";
import withAuthentication from "./Login/components/withAuthentication";

import * as routes from "./Routes/routes";

const App = () => ( 
  <Router>
    <div>
      <Navigation />
      <CheckAuth />
    </div>
  </Router>
);

export default withAuthentication(App);
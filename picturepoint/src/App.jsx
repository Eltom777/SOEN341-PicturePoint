//React
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import withAuthentication from "./Login/components/withAuthentication";

//Layout
import Navigation from "./Layouts/Navigation";

const App = () => ( 
  <Router>
    <div>
      <Navigation />
    </div>
  </Router>
);

export default withAuthentication(App);
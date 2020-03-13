//React
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

//Layout
import Navigation from "./Layouts/Navigation";

import withAuthentication from "./Login/components/withAuthentication";

const App = () => ( 
  <Router>
    <div>
      <Navigation />
    </div>
  </Router>
);

export default withAuthentication(App);
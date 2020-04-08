//React
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

//Components
import withAuthentication from "./Login/components/withAuthentication";
import Navigation from "./Layouts/Navigation";

//Material UI
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

//App theme
const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2a66e7'
    },
    secondary: {
      main: '#ff1744',
      secondary: "#D3D3D3"
    }
  }
});

const App = () => ( 
  <MuiThemeProvider theme={muiTheme}>
    <Router>
      <div className="App">
        <Navigation />
      </div>
    </Router>
  </MuiThemeProvider>
);

export default withAuthentication(App);
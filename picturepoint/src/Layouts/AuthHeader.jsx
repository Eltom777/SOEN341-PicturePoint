//React
import React from 'react';
import { Link } from "react-router-dom";
import * as routes from "../Routes/routes";

//Firebase
import { auth } from "../Firebase/index";

//Material UI
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBox from "@material-ui/icons/AccountBox";
import Home from "@material-ui/icons/Home";
import ExitToApp from "@material-ui/icons/ExitToApp";

//Style
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily: "Bradley Hand ITC"
    },
    list: {
        width: 250
    }
}));

//Render
function AuthHeader() {
    const classes = useStyles();

    //Left Menu Functionality
    const [state, setState] = React.useState({
      left: false,
    });
  
    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [side]: open });
    };
  
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
            <ListItem button component={Link} to={routes.HOME}>
              <ListItemIcon>
                  <Home />
              </ListItemIcon>
              <ListItemText>
                  Home
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={routes.ACCOUNT}>
              <ListItemIcon>
                  <AccountBox />
              </ListItemIcon>
              <ListItemText>
                  Account
              </ListItemText>
            </ListItem>
            <ListItem button onClick={auth.doSignOut} component={Link} to={routes.SIGN_IN}>
              <ListItemIcon>
                  <ExitToApp />
              </ListItemIcon>
              <ListItemText>
                  Logout
              </ListItemText>
            </ListItem>
        </List>
      </div>
    );

     return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                        {sideList('left')}
                    </Drawer>
                    <Typography variant="h3" className={classes.title}>
                        Picture Point
                    </Typography>
                    <IconButton
                        edge="end"
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AuthHeader;
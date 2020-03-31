//React
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import * as routes from "../Routes/routes";

//Firebase
import { auth } from "../Firebase/index";
import { usernameExists } from "../Firebase/functions/usernameExists";

//Material UI
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '20ch',
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        fontFamily: "Yu Gothic UI"
    },
    list: {
        width: 250
    }
}));

//Render
function AuthHeader({history}) {
    const classes = useStyles();
    var doesExist = false;

    //Search functionality
    const handleSubmit = (event) => {
        event.preventDefault();

        usernameExists(state.username, (data) => {
            if(data) {
                doesExist = true;
                window.open(`/${state.username}`, "_self");
            } else {
                doesExist = false;
                alert("No results found.");
            }
        })

        setState({
            username: ""
        });
    }

    const onChange = (event) => {
        setState({
            [event.target.name]: event.target.value
        });
    };

    const isInvalid = () => {
        return doesExist;
    }

    //Left menu functionality
    const [state, setState] = useState({
      left: false,
    });
  
    const toggleDrawer = (side, open) => event => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setState({ ...state, [side]: open });
    };
    
    //Menu component
    const sideList = side => (
      <div
        className={classes.list}
        role="presentation"
        onClick={toggleDrawer(side, false)}
        onKeyDown={toggleDrawer(side, false)}
      >
        <List>
            <ListItem button component={Link} to={`/${localStorage.getItem("username")}`}>
              <ListItemIcon>
                  <Home />
              </ListItemIcon>
              <ListItemText>
                  Home
              </ListItemText>
            </ListItem>
            <ListItem button component={Link} to={`/${localStorage.getItem("username")}/Account`}>
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
                    <img src="https://firebasestorage.googleapis.com/v0/b/picturepoint-381cf.appspot.com/o/Logo.png?alt=media&token=d41e7cc5-9831-4fb3-b4f1-c185e7832fff" width="55" height="35" />
                    <Typography variant="h3" className={classes.title}>
                        Picture Point
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <InputBase
                            name="username"
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={state.username}
                            onChange={onChange}
                            disabled={isInvalid()}
                            />
                        </form>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default AuthHeader;
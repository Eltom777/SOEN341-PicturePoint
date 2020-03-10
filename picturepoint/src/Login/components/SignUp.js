import React, { Component } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import "./auth.css";
import * as routes from "../constants/routes";
import { SignInLink } from "./SignIn";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const SignUpPage = ({ history }) => (
  <div align="center" className="SignUpBox">
    <h1>SignUp</h1>
    <SignUpForm history={history} />
    <SignInLink />
  </div>
);

const INITIAL_STATE = {
  username: "",
  name: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  //   checkPassword() {
  //     if(!this.state.passwordOne || this.state.passwordOne !== this.state.passwordTwo){
  //        this.setState({error:"passwords do not match"});
  //    }
  //    else {
  //        this.setState({error:null});
  //    }
  // }

  onSubmit = event => {
    event.preventDefault();

    const { email, passwordOne, name, username } = this.state;

    auth
      .doCreateUserWithEmailAndPassword(
        email,
        passwordOne,
        name,
        username
      )
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.props.history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });
  };

  render() {
    const {
      username,
      name,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      name === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          name="Username"
          id="standard-secondary"
          label="User name"
          color="primary"
          value={username}
          onChange={event =>
            this.setState(byPropKey("username", event.target.value))
          }
          type="text"
        />
        <TextField
          name="name"
          value={name}
          id="standard-secondary"
          label="Full name"
          color="primary"
          onChange={event =>
            this.setState(byPropKey("name", event.target.value))
          }
          type="text"
        />
        <TextField
          name="email"
          value={email}
          id="standard-secondary"
          label="Email Address"
          color="primary"
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="email"
        />
        <TextField
          name="password"
          value={passwordOne}
          id="standard-secondary"
          label="Password"
          color="primary"
          onChange={event =>
            this.setState(byPropKey("passwordOne", event.target.value))
          }
          type="password"
        />
        <TextField
          name="ConfirmPassword"
          value={passwordTwo}
          id="standard-secondary"
          label="Comfirm Password"
          color="primary"
          onChange={event =>
            this.setState(byPropKey("passwordTwo", event.target.value))
          }
          type="password"
        />

        <br />
        <br />

        <Button
          type="submit"
          disabled={isInvalid}
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>

        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };

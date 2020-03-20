import React, { Component } from "react";
import { Route } from 'react-router-dom';

import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import { auth } from "../../Firebase/index";
import * as routes from "../../Routes/routes";
import "./auth.css";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { getUser } from "../../Firebase/functions/getUser";

const SignInPage = ({ history }) => (
  <div align="center" className="SignInBox">
    <h2>SignIn</h2>
    <SignInForm history={history} />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        getUser(this.state.email, (user) => {
          this.setState(() => ({ ...INITIAL_STATE }));
          localStorage.setItem("username", user.username);
          history.push(`/${user.username}`);
        })
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <form onSubmit={this.onSubmit}>
      <TextField
        name="Email"
        label="Email"
        id="standard-secondary"
        value={email}
        onChange={event =>
          this.setState(byPropKey("email", event.target.value))
        }
      />
      <br />
      <TextField
        name="Password"
        type="password"
        id="standard-secondary"
        label="Password"
        color="primary"
        value={password}
        onChange={event =>
          this.setState(byPropKey("password", event.target.value))
        }
      />

      <br />
      <br />
        <Button
          type="submit"
          disabled={isInvalid}
          variant="contained"
          color="primary"
        >
          Sign In
        </Button>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    );
  }
}
const SignInLink = () => (
  <p>
    Already have an account?
    <br />
    <Link to={routes.SIGN_IN}>Sign In</Link>
  </p>
);

export default SignInPage;

export { SignInForm, SignInLink };

import React, { Component } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";

const PasswordForgetPage = () => (
  <div align="center">
    <h1>PasswordForget</h1>
    <PasswordForgetForm />
  </div>
);

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null,
  success: false
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    auth
      .doPasswordReset(email)
      .then(() => {
        sessionStorage.setItem("email", email);
        this.setState(() => ({ ...INITIAL_STATE, success: true }));
      })
      .catch(error => {
        this.setState(() => ({ ...INITIAL_STATE }));
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error, success } = this.state;

    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={this.state.email}
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
          type="email"
          placeholder="Email Address"
          autoFocus
        />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
        {success && (
          <p>Email sent successfully to {sessionStorage.getItem("email")}</p>
        )}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to="/pw-forget">Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };

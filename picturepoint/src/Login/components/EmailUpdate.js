import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { doEmailUpdate } from "../../Firebase/functions/auth";

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value
});

const INITIAL_STATE = {
  email: "",
  error: null
};

class EmailUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    doEmailUpdate(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  render() {
    const { email, error } = this.state;
    const isInvalid = email === "";

    return (
      <form onSubmit={this.onSubmit}>
        <TextField
          name="Email"
          value={email}
          id="standard-secondary"
          label="New email"
          color="primary"
          onChange={event =>
            this.setState(byPropKey("email", event.target.value))
          }
        />
        <br />
        <br />
        <br />
        <Button
          type="submit"
          disabled={isInvalid}
          variant="contained"
          color="primary"
        >
          Update my Email
        </Button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default EmailUpdateForm;

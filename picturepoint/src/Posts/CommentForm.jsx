//React
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material-UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { commentOnPost } from "../Firebase/functions/postComment";

const INITIAL_STATE = {
    body: ""
};
  
  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
  });
  
class CommentForm extends Component {
    state = { ...INITIAL_STATE };
  
    onSubmit = event => {
      event.preventDefault();

      const { body } = this.state;
    };
  
    render() {
      const {
        body
      } = this.state;
  
      //500 character limit
      const isInvalid = body.length > 500;
  
      return (
        <form onSubmit={this.onSubmit}>
          <TextField
            id="outlined-comment"
            label="Add a comment..."
            color="primary"
            variant="outlined"
            onChange={event =>
              console.log(event)
            }
          />
          <br />
          <Button
            type="submit"
            disabled={isInvalid}
            variant="contained"
            color="primary"
          >
            Post
          </Button>
        </form>
      );
    }
}

export default CommentForm;
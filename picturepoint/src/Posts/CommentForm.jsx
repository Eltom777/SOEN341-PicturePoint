//React
import React, { Component } from "react";

//Firebase
import { commentOnPost } from "../Firebase/functions/postComment";

//Material-UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newComment = {
      body: this.state.body,
      username: this.props.username,
      photo_id: this.props.photoID,
      createdAt: new Date().toISOString()
    };

    commentOnPost(newComment, (data) => {});

    this.setState({
      body: ""
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //500 character limit
  isInvalid() {
    return this.state.body.length > 200 || this.state.body === "";
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextField
            className="commentField"
            name="body"
            id="outlined-comment"
            label="Add a comment..."
            color="primary"
            variant="outlined"
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
          />
          <br />
          <br />
          <Button
            type="submit"
            disabled={this.isInvalid()}
            variant="contained"
            color="primary"
          >
            Post
          </Button>
        </form>
      </div>
    );
  }
}

export default CommentForm;
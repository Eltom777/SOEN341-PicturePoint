//React
import React, { Component } from "react";
import { Link } from "react-router-dom";

//Material-UI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { commentOnPost } from "../Firebase/functions/postComment";

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
    console.log(this.state);
    e.preventDefault();
    const newComment = {
      body: this.state.body,
      username: this.props.username,
      photo_id: this.props.photoID,
      createdAt: new Date().toISOString()
    };

    commentOnPost(newComment);

    this.setState({
      body: ""
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <div className="comments-form">
        <form onSubmit={this.handleSubmit}>
          <ul>
            <li>
              <textarea
                name="body"
                placeholder="Comment"
                value={this.state.body}
                onChange={this.handleChange}
                required
              />
            </li>
            <li>
              <input type="submit" value="Post" />
            </li>
          </ul>
        </form>
      </div>
    );
  }
}

export default CommentForm;
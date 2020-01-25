import React, { Component } from "react";

export default class Quote extends Component {
  state = {
    color: "",
    textDecorationLine: "",
    fontWeight: ""
  };

  handleLikes = () => {
    this.setState({
      color: "green",
      textDecorationLine: "",
      fontWeight: "bold"
    });
  };

  handleDislikes = () => {
    this.setState({
      color: "red",
      textDecorationLine: "line-through",
      fontWeight: ""
    });
  };

  render() {
    const { quoteText, quoteAuthor } = this.props;
    return (
      <div>
        <div
          style={{
            color: this.state.color,
            textDecorationLine: this.state.textDecorationLine,
            fontWeight: this.state.fontWeight
          }}
        >
          {quoteText}
        </div>
        <br />
        <div>By : {quoteAuthor}</div>
        <button onClick={this.handleDislikes}>:(</button>
        <button onClick={this.handleLikes}>:)</button>
      </div>
    );
  }
}

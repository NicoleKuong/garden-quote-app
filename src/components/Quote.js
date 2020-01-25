import React, { Component } from "react";

export default class Quote extends Component {
  state = {
    liked: null,
    style: {
      color: "",
      textDecorationLine: "",
      fontWeight: ""
    }
  };

  handleLikes = () => {
    this.setState({
      liked: true,
      style: {
        color: "green",
        textDecorationLine: "",
        fontWeight: "bold"
      }
    });

    if (this.state.liked === null) {
      this.props.setLiked();
    }

    if (this.state.liked === false) {
      this.props.setLiked();
      this.props.deleteDisliked();
    }
  };

  handleDislikes = () => {
    this.setState({
      liked: false,
      style: {
        color: "red",
        textDecorationLine: "line-through",
        fontWeight: ""
      }
    });

    if (this.state.liked === true) {
      this.props.setDisliked();
      this.props.deleteLiked();
    }

    if (this.state.liked === null) {
      this.props.setDisliked();
    }
  };

  render() {
    const { quoteAuthor, quoteText } = this.props;
    const { color, textDecorationLine, fontWeight } = this.state.style;

    return (
      <div>
        <div
          style={{
            color: color,
            textDecorationLine: textDecorationLine,
            fontWeight: fontWeight
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

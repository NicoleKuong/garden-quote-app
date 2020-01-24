import React, { Component } from "react";

export default class Quote extends Component {
  render() {
    const { quoteText, quoteAuthor } = this.props;
    return (
      <div>
        <div>{quoteText}</div>
        <br />
        <div>By : {quoteAuthor}</div>
        <br />
      </div>
    );
  }
}

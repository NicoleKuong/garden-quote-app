import React, { Component } from "react";

export default class AddOwnQuote extends Component {
  state = {
    quoteText: "",
    quoteAuthor: "Nicole"
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addQuote(this.state.quoteText, this.state.quoteAuthor);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="addOwnQuote">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="quoteText"
            onChange={this.handleChange}
            value={this.state.quoteText}
            placeholder="Submit your quote"
          />
          <input type="submit" value="add quote"></input>
        </form>
      </div>
    );
  }
}

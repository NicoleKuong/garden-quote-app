import React, { Component } from "react";

export default class KeywordSearch extends Component {
  state = { keyword: "" };

  handleSubmit = event => {
    event.preventDefault();
    this.state.keyword && this.props.changeKeyword(this.state.keyword);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="searchQuote">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="keyword"
            onChange={this.handleChange}
            value={this.state.keyword}
            placeholder="Search by keyword"
          />

          <input type="submit" value="Search" />
        </form>
      </div>
    );
  }
}

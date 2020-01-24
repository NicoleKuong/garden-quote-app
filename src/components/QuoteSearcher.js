import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    fetching: true,
    quotes: []
  };

  componentDidMount = async () => {
    try {
      const quoteData = await fetch(
        "https://quote-garden.herokuapp.com/quotes/search/tree"
      );
      const parsedQuoteData = await quoteData.json();
      const quoteDataResult = parsedQuoteData.results;
      this.setState({
        fetching: false,
        quotes: quoteDataResult
      });
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    console.log("data arrived!", this.state.quotes);
    const { quotes } = this.state;
    const quotesList =
      quotes &&
      quotes.map(quote => {
        // console.log("quote?", quote);
        return (
          <Quote quoteText={quote.quoteText} quoteAuthor={quote.quoteAuthor} />
        );
      });

    return (
      <div>
        {this.state.fetching ? (
          <div> Loading ...</div>
        ) : (
          <div>
            <h1>Quotes</h1>
            <div>{quotesList}</div>
          </div>
        )}
      </div>
    );
  }
}

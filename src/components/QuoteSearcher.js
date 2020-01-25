import React, { Component } from "react";
import Quote from "./Quote";

export default class QuoteSearcher extends Component {
  state = {
    fetching: true,
    quotes: [],
    liked: 0,
    disliked: 0
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
        quotes: quoteDataResult.map(quote => {
          return {
            ...quote,
            liked: 0,
            disliked: 0
          };
        })
      });
    } catch (error) {
      console.error(error);
    }
  };

  setLiked = () => {
    this.setState({ liked: this.state.liked + 1 });
  };

  setDisliked = () => {
    this.setState({ disliked: this.state.disliked + 1 });
  };

  deleteLiked = () => {
    this.setState({ liked: this.state.liked - 1 });
  };

  deleteDisliked = () => {
    this.setState({ disliked: this.state.disliked - 1 });
  };

  render() {
    // console.log("data arrived!", this.state.quotes);
    console.log(this.state);
    const { quotes } = this.state;
    const quotesList =
      quotes &&
      quotes.map(quote => {
        // console.log("quote?", quote);
        return (
          <Quote
            id={quote._id}
            quoteText={quote.quoteText}
            quoteAuthor={quote.quoteAuthor}
            key={quote.id}
            setDisliked={this.setDisliked}
            setLiked={this.setLiked}
            deleteDisliked={this.deleteDisliked}
            deleteLiked={this.deleteLiked}
          />
        );
      });

    return (
      <div>
        {this.state.fetching ? (
          <div> Loading ...</div>
        ) : (
          <div>
            <h1>Quotes</h1>
            <div>
              Liked : {this.state.liked} / Disliked : {this.state.disliked}
            </div>
            <div>{quotesList}</div>
          </div>
        )}
      </div>
    );
  }
}

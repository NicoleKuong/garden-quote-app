import React, { Component } from "react";
import Quote from "./Quote";
import KeywordSearch from "./KeywordSearch";
import AddOwnQuote from "./AddOwnQuote";

export default class QuoteSearcher extends Component {
  state = {
    fetching: true,
    quotes: [],
    liked: 0,
    disliked: 0,
    keyword: "tree"
  };

  quoteSearch = async () => {
    try {
      const quoteData = await fetch(
        `https://quote-garden.herokuapp.com/quotes/search/${this.state.keyword}`
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

  componentDidMount = async () => this.quoteSearch();

  changeKeyword = inputKeyword => {
    this.setState({ keyword: inputKeyword, fetching: "loading..." }, () => {
      this.quoteSearch();
    });
  };

  addQuote = (quoteText, quoteAuthor) => {
    const updatedQuote = {
      quoteAuthor: quoteAuthor,
      quoteText: quoteText
    };
    this.setState({
      quotes: this.state.quotes.concat(updatedQuote)
    });
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
    // console.log(this.state);
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
        <h1>The Quote Machine</h1>

        <div>
          <h3>Add you own quote</h3>
          <AddOwnQuote addQuote={this.addQuote} />
        </div>
        <br />

        <div>
          <KeywordSearch changeKeyword={this.changeKeyword} />
        </div>
        <br />

        {this.state.fetching && "Loading..."}

        {!this.state.fetching && (
          <h3>Quote found: {this.state.quotes.length}</h3>
        )}

        <h2>
          Liked : {this.state.liked} / Disliked : {this.state.disliked}
        </h2>

        {!this.state.fetching && this.state.quotes.length === 0 && (
          <h2>Cannot find any quotes!</h2>
        )}
        <div>{quotesList}</div>
      </div>
    );
  }
}

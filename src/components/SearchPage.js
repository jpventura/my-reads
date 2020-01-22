import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Book from "./Book.js";

class SearchPage extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onSearch: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  };

  render() {
    const { result, onSearch, query, onUpdate } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={query}
              type="text"
              placeholder="Search by title or author"
              onChange={event => onSearch(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {result.length > 0 &&
              result.map(book => (
                <Book id={book.id} book={book} onUpdate={onUpdate} />
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchPage;

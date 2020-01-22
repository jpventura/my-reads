import React from "react";
import Book from "./Book.js";
import PropTypes from "prop-types";

class Bookshelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdate: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  };

  createBookItem = book => {
    const { shelf, onUpdate } = this.props;

    return <Book key={book.id} book={book} shelf={shelf} onUpdate={onUpdate} />;
  };

  filterByShelf = book => {
    const { shelf } = this.props;
    return book.shelf === shelf;
  };

  render = () => {
    const { title, books } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.filter(this.filterByShelf).map(this.createBookItem)}
          </ol>
        </div>
      </div>
    );
  };
}

export default Bookshelf;

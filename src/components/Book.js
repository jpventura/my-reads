import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onUpdate: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.setState({ shelf: this.props.shelf });
  }

  onSelect = (shelf, book) => {
    this.setState({ shelf });
    this.props.onUpdate(book, shelf);
  };

  render() {
    const { book } = this.props;
    const shelf = book.shelf || "none";

    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 192,
                backgroundImage: `url(${book.imageLinks.thumbnail})`
              }}
            ></div>
            <div className="book-shelf-changer">
              <select
                value={shelf}
                onChange={event => this.onSelect(event.target.value, book)}
              >
                <option value="none" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors.join(", ")}</div>
        </div>
      </li>
    );
  }
}

export default Book;

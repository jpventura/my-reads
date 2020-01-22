import React from 'react'
import * as BooksAPI from './middleware/api'
import './App.css'
import { Link, Route } from 'react-router-dom';

import {
  Bookshelf,
  SearchPage,
} from './components';

class BooksApp extends React.Component {
  state = {
    books: [],
    query: '',
    result: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    })
  }

  filterByShelf = (shelf) => {
    const { books } = this.state
    return books.filter((book) => book.shelf === shelf)
  }

  onQuery = (query) => {
    if (query) {
      this.setState({ query });
      this.searchByTitleOrAuthor(query);
    } else {
      this.setState({ result: [], query: '' });
    }
  }

  onUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then((books) => {
      book.shelf = shelf;
      this.setState((state) => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }))
    })
  }

  render() {
    return (
        <div className="app">
          <Route exact path="/" render={() => (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <Bookshelf
                        shelf="currentlyReading"
                        title="Currently Reading"
                        books={this.state.books}
                        onUpdate={this.onUpdate}
                    />

                    <Bookshelf
                        shelf="wantToRead"
                        title="Want to Read"
                        books={this.state.books}
                        onUpdate={this.onUpdate}
                    />

                    <Bookshelf
                        shelf="read"
                        title="Read"
                        books={this.state.books}
                        onUpdate={this.onUpdate}
                    />
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>
                    Add a book
                  </Link>
                </div>
              </div>
          )}/>
          <Route exact path="/search" render={() => (
              <SearchPage
                  books={this.state.books}
                  result={this.state.result}
                  onSearch={this.onQuery}
                  onUpdate={this.onUpdate}
                  query={this.state.query}
              />
          )}/>
        </div>
    )
  }

  searchByTitleOrAuthor = (query) => {
    BooksAPI.search(query).then((books) => {
      this.setState({ result: books });
    })
  }
}

export default BooksApp

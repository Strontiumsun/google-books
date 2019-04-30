import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { BookList, BookListItem } from "../components/BookList";
import API from "../utils/API"



class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    query: "",
    results: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: ""

  };

  // Add code here to get all books from the database and save them to this.state.books
  // componentDidMount() {
  //   this.retrieveBooks()
  // }

  retrieveBooks = () => {
    API.getBooks()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  googleSearch = (query) => {
    API.getGoogleBooks(query)
      // .then(res => console.log(res.data))
      .then(res => this.setState({ results: res.data }))
      .catch(err => console.log(err))
  }

  deleteBook = (id) => {
    API.deleteBook(id)
      .then(res => this.retrieveBooks())
      .catch(err => console.log(err))
  }

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const value = event.target.value;
    const name = event.target.name;

    // Updating the input's state
    this.setState({
      [name]: value
    });


  };


  handleFormSubmit = event => {
    event.preventDefault();
    console.log("Pressed submit button!")

    console.log(this.state.query)
    this.googleSearch(this.state.query)

  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>React Google Books Search!</h1>
              <h3>What do you know? You can search for books! Eventually...</h3>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Input
              value={this.state.query}
              name="query"
              onChange={this.handleInputChange}
              type="text"
              placeholder="Search...">
            </Input>
            <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
          </Col>
          <Col size="md-12">
            {!this.state.results.length ? (<h1 className="text-center">No Books to Display</h1>) : (
              <BookList>
                {this.state.results.map(books => {
                  return (
                    <BookListItem
                      key={books.id}
                      title={books.volumeInfo.title}
                      link={books.volumeInfo.infoLink}
                      authors={books.volumeInfo.authors.join(", ")}
                      description={books.volumeInfo.description}
                      thumbnail={books.volumeInfo.imageLinks.thumbnail}
                    >
                    </BookListItem>)

                })}
              </BookList>
            )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;

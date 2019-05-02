import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
import { Input, FormBtn } from "../components/Form";
import { BookList, BookListItem } from "../components/BookList";
import SaveBtn from "../components/SaveBtn"

import API from "../utils/API"



class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    query: "",
    results: [],
  };


  googleSearch = (query) => {
    API.getGoogleBooks(query)
      // .then(res => console.log(res.data))
      .then(res => this.setState({ results: res.data }))
      .catch(err => console.log(err))
  }

  // deleteBook = (id) => {
  //   API.deleteBook(id)
  //     .then(res => this.retrieveBooks())
  //     .catch(err => console.log(err))
  // }

  // I couldn't get this function to work
  handleBookSave = id => {
    console.log("clicked save button!")
    // line 37 came from Paul. 
    const book = this.state.results.find(books => books.id === id)

    API.saveBook({
      title: book.volumeInfo.title,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(res => console.log("book saved!")).catch(err => console.log(err))
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
              <h3>What do you know? You can search for books!</h3>
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
                {this.state.results.map(books =>
                  (
                    <div>
                      <BookListItem
                        key={books.title}
                        title={books.volumeInfo.title}
                        link={books.volumeInfo.infoLink}
                        authors={books.volumeInfo.authors.join(", ")}
                        description={books.volumeInfo.description}
                        thumbnail={books.volumeInfo.imageLinks.thumbnail}
                      >
                      </BookListItem>
                      <SaveBtn
                        onClick={() => this.handleBookSave(books.id)}
                      />

                    </div>)

                )}
              </BookList>
            )}

          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;

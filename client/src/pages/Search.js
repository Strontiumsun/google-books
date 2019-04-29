import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";
import API from "../utils/API"

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: ""

  };

  // Add code here to get all books from the database and save them to this.state.books
  componentDidMount() {
    this.retrieveBooks()
  }

  // retrieveBooks = () => {
  //   API.getBooks()
  //     .then(res => this.setState({ books: res.data }))
  //     .catch(err => console.log(err));
  // }

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
    API.saveBook({ title: this.state.title, author: this.state.author, synopsis: this.state.synopsis })
      .then(res => this.retrieveBooks())
      .catch(err => console.log(err));

  }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                name="title"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Title (required)"

              />
              <Input
                value={this.state.author}
                name="author"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Author (required)"
              />
              <TextArea
                value={this.state.synopsis}
                name="synopsis"
                onChange={this.handleInputChange}
                type="text"
                placeholder="Synopsis (Optional)"

              />
              <FormBtn onClick={this.handleFormSubmit}>Submit Book</FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <a href={"/books/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </a>
                    <DeleteBtn
                      onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;

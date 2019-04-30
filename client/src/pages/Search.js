import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import Booklist, { BookListItem } from "../components/Booklist";
import API from "../utils/API"
import { FormBtn } from "../components/Form";

class Books extends Component {
  // Initialize this.state.books as an empty array
  state = {
    books: [],
    search: [],
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

  googleBooks = (query) => {
    API.googleBooks(query)
      .then(res => this.setState({ search: res.data }))
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


  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   API.saveBook({ title: this.state.title, author: this.state.author, synopsis: this.state.synopsis })
  //     .then(res => this.retrieveBooks())
  //     .catch(err => console.log(err));

  // }


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Jumbo!</h1>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <TextArea />
            <Input onClick={this.handleInputChange}>
            </Input>
            <FormBtn onClick={}></FormBtn>
          </Col>
          <Col size="md-12">
            <Booklist>

            </Booklist>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;

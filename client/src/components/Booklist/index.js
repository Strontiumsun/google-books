import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";


export function BookList({ children }) {
  return <ul className="list-group">{children}</ul>;
}

export function BookListItem(props) {
  return (
    <li className="list-group-item">
      <Container>
        <Row>
          <Col size="xs-4 sm-2">
            <Thumbnail src={props.thumbnail} />
          </Col>
          <Col size="xs-8 sm-9">
            <h3>{props.title}</h3>
            <h4>{props.authors}</h4>
            <p>
              {props.description}
            </p>
            <a
              rel="noreferrer noopener"
              target="_blank"
              href={props.link}
            >
              Learn More
            </a>
          </Col>
        </Row>
      </Container>
    </li>
  );
}

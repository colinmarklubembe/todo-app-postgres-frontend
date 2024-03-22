import React, { useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
      // onSearch(searchQuery);
      const query = e.target.value;
      setSearchQuery(query);
      onSearch(query);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search for todos..."
              className="search-bar rounded"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {/* <Button
              className="search-button rounded-pill"
              variant="outline-info"
              onClick={handleSearch}
            >
              Search
            </Button> */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SearchBar;

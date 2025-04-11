import React, { useState, useEffect } from "react";
import axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { NavLink } from "react-router-dom";
import { Container, Card, Alert, Row, Col } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Search() {
  const [shoeList, setShoeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleShoes, setVisibleShoes] = useState(10);

  // Fetch shoes from the server
  useEffect(() => {
    axios
      .get("http://localhost:3001/shoes")
      .then((response) => {
        setShoeList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching shoes:", error);
      });
  }, []);

  const fetchMoreData = () => {
    setVisibleShoes((prevVisibleShoes) => prevVisibleShoes + 10);
  };

  const filteredShoes = shoeList.filter((shoe) =>
    shoe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <Container className="d-flex justify-content-center">
        <NavLink to="/" className="btn btn-primary mb-3">
          <HomeIcon />
        </NavLink>
      </Container>
      <form className="search-container">
        <input
          type="search"
          placeholder="Search for shoes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="button" className="search-button">
          Search
        </button>
      </form>
      {filteredShoes.length === 0 && (
        <Alert variant="warning" className="text-center">
          No shoes found matching your search term.
        </Alert>
      )}
      <InfiniteScroll
        dataLength={visibleShoes}
        next={fetchMoreData}
        hasMore={visibleShoes < filteredShoes.length}
        loader={<h4>Loading...</h4>}
      >
        <Row className="g-4 mt-3">
          {filteredShoes.slice(0, visibleShoes).map((shoe) => (
            <Col key={shoe._id} xs={12} sm={6} md={4} lg={3}>
              <Card className="shoe-card">
                <Card.Img
                  variant="top"
                  src={`http://localhost:3001/uploads/${shoe.image}`}
                  alt={shoe.name}
                  className="shoe-image"
                />
                <Card.Body className="card-body">
                  <Card.Title className="card-title">{shoe.name}</Card.Title>

                  <Card.Text>Type: {shoe.type}</Card.Text>
                  <Card.Text>Sizes: {shoe.sizes.join(", ")}</Card.Text>
                  <Card.Text>Color: {shoe.color}</Card.Text>
                  <Card.Text>Price: {shoe.price}$</Card.Text>
                  <Card.Text>Stock: {shoe.stock}</Card.Text>
                  <NavLink
                    to={`/products/${shoe._id}`}
                    className="details-button"
                  >
                    View Details
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </InfiniteScroll>
    </div>
  );
}
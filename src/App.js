import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeIcon from "@mui/icons-material/Home";
import Home from "./components/Home";
import Products from "./components/Products";
import AddProduct from "./components/AddProduct";
import Search from "./components/Search";
import Filter from "./components/Filter";
import ProductDetail from "./components/ProductDetail";

export function App() {
  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">Shoe Management</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
              <Nav.Link as={NavLink} to="/addProduct">Add Product</Nav.Link>
              <Nav.Link as={NavLink} to="/search">Search Product</Nav.Link>
              {/* <Nav.Link as={NavLink} to="/filter">Filter Product</Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          {/* <Route path="/products/:id" element={<ProductDetail />} /> */}
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/search" element={<Search />} />
          {/* <Route path="/filter" element={<Filter />} /> */}
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
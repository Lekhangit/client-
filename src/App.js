import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Home from "./components/Home";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail"; 
import AddProduct from "./components/AddProduct";
import Search from "./components/Search";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

export function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false); // State để hiển thị Login modal
  const [showSignUp, setShowSignUp] = useState(false); // State để hiển thị Sign Up modal

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

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
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Nav.Link disabled>
                    <AccountCircleIcon /> {user.username}
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link onClick={() => setShowLogin(true)}>Login</Nav.Link>
                  <Nav.Link onClick={() => setShowSignUp(true)}>Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/search" element={<Search />} />
          <Route path="/products/:id" element={<ProductDetail />} /> {/* Route mới */}
        </Routes>
      </Container>

      {/* Modal Login */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login setUser={setUser} closeModal={() => setShowLogin(false)} />
        </Modal.Body>
      </Modal>

      {/* Modal Sign Up */}
      <Modal show={showSignUp} onHide={() => setShowSignUp(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUp closeModal={() => setShowSignUp(false)} />
        </Modal.Body>
      </Modal>
    </BrowserRouter>
  );
}

export default App;
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";

function BlogNavbar({ theme, toggleTheme }) {
  const [isSignedIn, setIsSignedIn] = useState(false); // For sign-in/sign-out state
  const [navColour, updateNavbar] = useState(false); // For sticky navbar
  const navigate = useNavigate();

  const handleSignInSignOut = () => {
    setIsSignedIn(!isSignedIn);
  };

  const handleDropdownSelect = (value) => {
    navigate(`/topic/${value}`);
  };

  const scrollHandler = () => {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  };

  // Add event listener for scroll
  window.addEventListener("scroll", scrollHandler);

  return (
    <Navbar
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        {/* Home Icon */}
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <AiOutlineHome style={{ fontSize: "1.5em", cursor: "pointer" }} />
        </Navbar.Brand>

        {/* Dropdown Filter */}
        <Dropdown onSelect={handleDropdownSelect}>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Filter
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item eventKey="val1">Val1</Dropdown.Item>
            <Dropdown.Item eventKey="val2">Val2</Dropdown.Item>
            <Dropdown.Item eventKey="val3">Val3</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Right-Aligned Options */}
        <Nav className="ms-auto">
          {/* Theme Toggle */}
          <Button variant="outline-secondary" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </Button>

          {/* SignIn/SignOut Button */}
          <Button
            variant="primary"
            className="ms-2"
            onClick={handleSignInSignOut}
          >
            {isSignedIn ? "Sign Out" : "Sign In"}
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BlogNavbar;

import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext"; // Import useTheme hook

function BlogNavbar() {
  const [isSignedIn, setIsSignedIn] = useState(false); // For sign-in/sign-out state
  const [navColour, updateNavbar] = useState(false); // For sticky navbar
  const { theme, setTheme } = useTheme(); // Use theme from context

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light"); // Toggle theme
  };

  const handleSignInSignOut = () => {
    setIsSignedIn(!isSignedIn);
  };

  const scrollHandler = () => {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  };

  // Add event listener for scroll
  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler); // Clean up on unmount
    };
  }, []);

  return (
    <Navbar
      fixed="top"
      expand="md"
      className={`${navColour ? "sticky" : "navbar"} ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`} // Apply theme classes
    >
      <Container>
        {/* Home Icon */}
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <AiOutlineHome style={{ fontSize: "1.5em", cursor: "pointer" }} />
        </Navbar.Brand>

        {/* Right-Aligned Options */}
        <Nav className="ms-auto">
          {/* Theme Toggle */}
          <Button variant="outline-secondary" onClick={toggleTheme}>
            {theme === "light" ? <FaMoon /> : <FaSun />} {/* Toggle icon */}
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

import React from "react";
import { Container } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext"; // Import useTheme hook
import BlogHome from "./BlogHome";

function Blog() {
  const { theme } = useTheme(); // Get the current theme from context

  return (
    <Container
      fluid
      className={`blog-section ${
        theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"
      }`} // Apply background and text color based on the theme
    >
      <Container style={{ position: "relative" }}>
        <h1 className="blog-heading">
          Personal <strong className="purple">Blogs</strong>
        </h1>
        <BlogHome />
      </Container>
    </Container>
  );
}

export default Blog;

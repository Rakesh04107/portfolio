import React from "react";
import { Container } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext"; // Import useTheme hook
import BlogHome from "./BlogHome";

function Blog() {
  const { theme } = useTheme(); // Get the current theme from context

  return (
    <Container
      fluid
      className={`blog-section-${
        theme === "dark" ? "dark":"light"
      }`} // Apply background and text color based on the theme
      style={{minHeight:"100%"}}
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

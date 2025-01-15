import React from "react";
import { Container } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext"; // Import useTheme hook
import BlogHome from "./BlogHome";

function Blog() {
  const { theme } = useTheme(); // Get the current theme from context

  return (
    <Container fluid className="blog-section" style={{ minHeight: "100vh" }}>
      <Container style={{ position: "relative", padding: "2rem" }}>
        <h1 className="blog-heading text-center mb-4">
          Personal <strong className="purple">Blogs</strong>
        </h1>
        <BlogHome theme={theme} />
      </Container>
    </Container>
  );
}

export default Blog;

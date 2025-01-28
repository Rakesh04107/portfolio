import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { Row, Col, Container, Spinner, Alert } from "react-bootstrap";

const branch = process.env.REACT_APP_BRANCH || 'main';

function BlogHome({ theme }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(
          `https://raw.githubusercontent.com/1md3nd/portfolio/refs/heads/${branch}/Public/raw_blogs/blogs.json`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blogs");
        }
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);
  return (
    <Container className="blog-section">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : blogs.length === 0 ? (
        <p className="text-center">No blogs available.</p>
      ) : (
        <Row className="justify-content-center">
          {blogs.map((blog) => (
            <Col md={4} key={blog.id} className="mb-4">
              <BlogCard blog={blog} theme={theme} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
export default BlogHome;
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { Row, Col } from "react-bootstrap";

const GITHUB_API_URL = "https://api.github.com/repos/soumyajit4419/Bits-0f-C0de/blob/main/_content/";

function BlogHome() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch list of blog markdown files from GitHub
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(GITHUB_API_URL);
        const data = await response.json();

        // Filter out markdown files and format the blog list
        const blogsList = data
          .filter((file) => file.name.endsWith(".md"))
          .map((file) => ({
            id: file.name.replace(".md", ""),
            url: file.download_url,
            title: file.name.replace(/-/g, " ").replace(".md", ""),
          }));

        setBlogs(blogsList);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <p>Loading blogs...</p>;
  }

  if (blogs.length === 0) {
    return <p>No blogs available.</p>;
  }

  return (
    <Row className="justify-content-center">
      {blogs.map((blog) => (
        <Col md={4} key={blog.id} className="blog-card">
          <BlogCard blog={blog} />
        </Col>
      ))}
    </Row>
  );
}

export default BlogHome;

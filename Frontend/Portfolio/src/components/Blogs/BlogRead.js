import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useTheme } from "../../context/ThemeContext";
import { Container, Spinner, Alert } from "react-bootstrap";

function BlogDetail() {
  const { blogId } = useParams();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogMetadata, setBlogMetadata] = useState(null);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        // Fetch the blog metadata
        const metadataResponse = await fetch(
          "https://raw.githubusercontent.com/1md3nd/portfolio/refs/heads/dev/public/blogs.json"
        );
        if (!metadataResponse.ok) {
          throw new Error("Failed to fetch blog metadata");
        }
        const metadata = await metadataResponse.json();
        const blogData = metadata.find((blog) => blog.id === blogId);
        if (!blogData) {
          throw new Error("Blog metadata not found");
        }
        setBlogMetadata(blogData);

        // Fetch the blog content
        const url = `https://raw.githubusercontent.com/1md3nd/portfolio/dev/public/blogs/${blogId}.md`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        setError(error.message);
        setContent("# Blog Not Found\nThe blog you're looking for does not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [blogId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container
      fluid
      className={`about-section ${theme === "light" ? "bg-light text-dark" : "bg-dark text-white"}`}
      style={{ padding: "2rem" }}
    >
      {blogMetadata && (
        <div className="mb-4">
          <h1>{blogMetadata.title}</h1>
          <p className="text-muted">By {blogMetadata.author}</p>
        </div>
      )}
      <ReactMarkdown className="about-content">{content}</ReactMarkdown>
    </Container>
  );
}

export default BlogDetail;
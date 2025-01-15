import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import { Container, Spinner, Alert, Image } from "react-bootstrap";
import { Buffer } from "buffer";

function BlogDetail() {
  const { blogId } = useParams();
  const [content, setContent] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  if (!window.Buffer) {
    window.Buffer = Buffer;
  }

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        // Fetch the blog content including metadata
        const url = `https://raw.githubusercontent.com/1md3nd/portfolio/dev/public/blogs/${blogId}.md`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Blog not found");
        }

        const text = await response.text();

        // Parse the Markdown file with gray-matter
        const { data: blogMetadata, content: blogContent } = matter(text);

        // Update state
        setMetadata(blogMetadata);
        setContent(blogContent);
        console.log(metadata, content);
      } catch (err) {
        setError(err.message);
        setContent(
          "# Blog Not Found\nThe blog you're looking for does not exist.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [blogId, content, metadata]);

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
      className="blog-page-section"
      style={{ padding: "10rem", color: "white" }}
    >
      {metadata && (
        <Container
          className="mb-4 d-flex align-items-center"
          style={{
            backgroundColor: "var(--clr-surface-a10)",
            color: "var(--clr-primary-a20)",
            borderRadius: "8px",
            padding: "1.5rem",
          }}
        >
          {metadata.headerImage && (
            <Image
              src={metadata.headerImage}
              alt={metadata.title}
              fluid
              rounded
              className="me-3"
              style={{ maxWidth: "150px", height: "auto" }}
            />
          )}
          <Container style={{ paddingLeft: "20px" }}>
            <h1>{metadata.title}</h1>
            <p className="text" style={{ color: "var(--clr-primary-a50)" }}>
              <strong>By:</strong> {metadata.author}
            </p>
            <p className="text" style={{ color: "var(--clr-primary-a40)" }}>
              <strong>Published on:</strong> {metadata.time}
            </p>
          </Container>
        </Container>
      )}
      <Container className="blog-page-content" style={{ textAlign: "left" }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </Container>
    </Container>
  );
}

export default BlogDetail;

import React from "react";
import { Card, Button } from "react-bootstrap";

function BlogCard({ blog, theme }) {
  return (
    <Card
      className={`h-100 ${theme === "light" ? "bg-light text-dark" : "bg-dark text-white"}`}
    >
      <Card.Img variant="top" src={blog.headerImage} alt={blog.title} />
      <Card.Body>
        <Card.Title className="blog-card-title">{blog.title}</Card.Title>
        <Card.Text className="blog-card-author">By {blog.author}</Card.Text>
        <Button
          variant={theme === "light" ? "primary" : "secondary"}
          onClick={() => (window.location.href = `/blog/${blog.id}`)}
        >
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;

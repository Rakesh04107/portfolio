import React from "react";
import { Card, Button } from "react-bootstrap";

function BlogCard({ blog }) {
  return (
    <Card className="h-100">
      <Card.Img variant="top" src={blog.headerImage} alt={blog.title} />
      <Card.Body>
        <Card.Title>{blog.title}</Card.Title>
        <Card.Text>By {blog.author}</Card.Text>
        <Button
          variant="primary"
          onClick={() => (window.location.href = `/blog/${blog.id}`)}
        >
          Read More
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BlogCard;
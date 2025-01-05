import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function BlogCard({ blog, onLike, theme }) {
  // Conditional class for dark/light mode based on the passed 'theme' prop
  const isDarkMode = theme === "dark";

  return (
    <Link to={`/blog/${blog.data.Id}`} style={{ textDecoration: "none" }}>
      <Card
        className={`blog-card-view ${
          isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
        } shadow-sm mb-4`}
      >
        <Card.Img
          variant="top"
          src={blog.imgPath || "/default-blog-img.jpg"}
          alt="Blog Cover"
        />
        <Card.Body>
          <Card.Title>{blog.data.Title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {blog.content || "No content available."}
          </Card.Text>
          <Card.Text>
            <small>
              <strong>Topic:</strong> {blog.data.Topic}
            </small>
            <br />
            <small>
              <strong>Read Time:</strong> {blog.readTime.text}
            </small>
          </Card.Text>
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => onLike(blog.data.Id)}
            >
              Like ({blog.likes || 0})
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}

export default BlogCard;

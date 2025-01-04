import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import {  Row, Col } from "react-bootstrap";


// Fetch blog data from JSON
function fetchBlogData(url) {
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch blogs");
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

function BlogHome({theme}) {
  const [blogs, setBlogs] = useState([]);

  // Load blog data and topics
  useEffect(() => {
    const loadBlogs = async () => {
      const data = await fetchBlogData("/blogs.json");
      setBlogs(data);
    };

    loadBlogs();
  }, []);

  // Handle like functionality
  const handleLike = (id) => {
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog.data.Id === id
          ? { ...blog, likes: blog.likes + 1 } // Increment like count
          : blog
      )
    );
  };

  // Handle delete functionality
  const handleDelete = (id) => {
    setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.data.Id !== id));
  };

  return (
    <>
      <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      {blogs.length === 0 ? (
        <p>No blogs available.</p> // Handle empty blogs state
      ) : (
        blogs.map((blog) => (
          <Col md={4} className="blog-card" key={blog.data.Id}>
            <BlogCard
              key={blog.data.Id}
              blog={blog}
              theme={theme}
              onLike={handleLike}
              onDelete={handleDelete}   
            />
          </Col>
        ))
      )}
      </Row>

    </>
  );
}


export default BlogHome;
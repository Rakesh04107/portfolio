import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
// import { useSelector } from "react-redux";
import BlogHome from "./BlogHome";
import BlogNavbar from "./BlogNavbar";

function Blog() {
  // const counter = useSelector((state) => state.counter.value);
  const [theme, setTheme] = useState("light");
   // Apply theme to body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Container
      fluid
      className="blog-section">
      <BlogNavbar theme={theme} toggleTheme={handleToggleTheme} /> 
      <Container style={{ position: "relative" }}>
        <h1 className="blog-heading">
          Personal <strong className="purple">Blogs</strong>
        </h1>
        <BlogHome theme={theme}/>
      </Container>
    </Container>
  );
}

export default Blog;

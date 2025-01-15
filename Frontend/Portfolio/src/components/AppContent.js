import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Home from "./Home/Home";
import About from "./About/About";
import Projects from "./Projects/Projects";
import Footer from "./Footer";
import Resume from "./Resume/ResumeNew";
import Blog from "./Blogs/Blog";
import ScrollToTop from "./ScrollToTop";
import BlogRead from "./Blogs/BlogRead";

// AppContent Component handles route changes and renders Navbar based on the location
function AppContent({ load }) {

  return (
    <div
      className="App"
      id={load ? "no-scroll" : "scroll"}
    >
 <NavbarComponent />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Projects />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:blogId" element={<BlogRead />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default AppContent;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

function BlogDetail() {
  const { blogId } = useParams(); // Get blog ID from URL parameters
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        // Construct the URL for the specific blog markdown file
        const url = `https://raw.githubusercontent.com/1md3nd/portfolio/blog/public/blogs/${blogId}.md`;

        // Fetch the raw markdown file
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error("Failed to fetch blog content:", error);
        setContent("# Blog Not Found\nThe blog you're looking for does not exist.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogContent();
  }, [blogId]);

  if (loading) {
    return <p>Loading blog...</p>;
  }

  return (
    <div className="container">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default BlogDetail;

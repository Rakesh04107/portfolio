import React, { useState, useEffect } from "react";

function Type() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrases = ["DevOps Enthusiast", "Cloud Specialist", "Problem Solver"];
  const currentPhrase = phrases[index % phrases.length];
  const typingSpeed = 100; // Adjusted for smoother typing
  const deletingSpeed = 50; // Adjusted for smoother deleting
  const pauseTime = 2000; // Increased pause time for better readability

  useEffect(() => {
    let timer;

    if (isDeleting) {
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    } else {
      if (text.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase]);

  return (
    <div>
      <h2 aria-live="polite">{text}</h2> {/* Added aria-live for accessibility */}
    </div>
  );
}

export default Type;

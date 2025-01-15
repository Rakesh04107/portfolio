import React, { useState, useEffect } from "react";

function Type() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrases = ["DevOps Enthusiast", "Cloud Specialist", "Problem Solver"];
  const currentPhrase = phrases[index % phrases.length];
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const pauseTime = 1500;

  useEffect(() => {
    let timer;

    if (isDeleting) {
      // Deleting the text
      if (text.length > 0) {
        timer = setTimeout(() => {
          setText(text.slice(0, text.length - 1));
        }, deletingSpeed);
      } else {
        // After deletion, move to the next phrase
        setIsDeleting(false);
        setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    } else {
      // Typing the text
      if (text.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, typingSpeed);
      } else {
        // After typing the whole phrase, wait before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, currentPhrase, phrases.length]);

  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
}

export default Type;

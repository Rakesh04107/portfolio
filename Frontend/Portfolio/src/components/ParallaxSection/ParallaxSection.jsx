// src/components/ParallaxSection/ParallaxSection.jsx
import React from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';
import './ParallaxSection.css';

const ParallaxSection = () => {
  return (
    <ParallaxProvider>
      <section className="parallax-container">
        <Parallax translateY={[-20, 20]} className="parallax-layer">
          <div className="tech-stack">
            <h2>Tech Stack</h2>
            {/* Your tech stack icons/content */}
          </div>
        </Parallax>
        
        <Parallax translateY={[-30, 30]} className="parallax-layer">
          <div className="projects">
            <h2>Projects</h2>
            {/* Your projects content */}
          </div>
        </Parallax>
      </section>
    </ParallaxProvider>
  );
};

export default ParallaxSection;
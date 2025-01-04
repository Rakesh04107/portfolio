import React, { useEffect, useState } from "react";
// import Particles from "react-tsparticles";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim"; // Slim version of tsparticles

const options = {
  key: "linkTriangles",
  name: "Link Triangles",
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
      },
    },
    color: {
      value: "#ff0000",
      animation: {
        enable: true,
        speed: 20,
        sync: true,
      },
    },
    shape: {
      type: "circle",
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
    links: {
      enable: true,
      distance: 150,
      color: "random",
      opacity: 0.4,
      width: 1,
      triangles: {
        enable: true,
        color: "#ffffff",
        opacity: 0.1,
      },
    },
    move: {
      enable: true,
      speed: 6,
    },
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse",
      },
      onClick: {
        enable: true,
        mode: "push",
      },
    },
    modes: {
      grab: {
        distance: 400,
        links: {
          opacity: 1,
        },
      },
      bubble: {
        distance: 400,
        size: 40,
        duration: 2,
        opacity: 0.8,
      },
      repulse: {
        distance: 200,
      },
      push: {
        quantity: 4,
      },
      remove: {
        quantity: 2,
      },
    },
  },
  background: {
    color: "#000000",
  },
};

const ParticleBackground = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize the particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine); // Load the slim version of tsparticles
    }).then(() => {
      setIsInitialized(true); // Set the initialization flag
    });
  }, []);

  if (!isInitialized) {
    return null; // Avoid rendering before initialization
  }

  return <Particles id="tsparticles" options={options} />;
};

export default ParticleBackground;

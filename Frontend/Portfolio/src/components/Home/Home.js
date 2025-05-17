import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion"; // Added for animations
import homeLogo from "../../Assets/home-main.png";
import Home2 from "./Home2";
import Type from "./Type";
import { useTheme } from "../../context/ThemeContext";

const HomeSection = styled(motion.section)` // Added motion for animations
  background: ${({ theme }) =>
    theme === "dark" ? "linear-gradient(135deg, #121212, #1c1c1c)" : "linear-gradient(135deg, #1c2833, #2c3e50)"};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#e0f7fa")};
  padding: 80px 0;
  min-height: 100vh; /* Ensure full viewport height */
  display: flex;
  align-items: center;
`;

const HomeContent = styled(Container)`
  position: relative;
`;

const Heading = styled(motion.h1)` // Added motion for animations
  font-size: 3em;
  font-weight: 700;
  margin-bottom: 20px;
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#e0f7fa")}; /* Dynamic color */
`;

const MainName = styled.strong`
  color: #64ffda; /* Teal accent */
`;

const ImageCol = styled(Col)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomeImage = styled(motion.img)` // Added motion for animations
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

function Home() {
  const { isDark } = useTheme();

  return (
    <HomeSection
      theme={isDark ? "dark" : "light"}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <HomeContent>
        <Row>
          <Col md={7} className="home-header">
            <Heading
              theme={isDark ? "dark" : "light"}
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hi There!{" "}
              <span className="wave" role="img" aria-label="waving hand">
                👋🏻
              </span>
            </Heading>

            <Heading
              theme={isDark ? "dark" : "light"}
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I'M <MainName>ANURAG RANJAN</MainName>
            </Heading>

            <div style={{ padding: "50px 0", textAlign: "left" }}>
              <Type />
            </div>
          </Col>

          <ImageCol md={5}>
            <HomeImage
              src={homeLogo}
              alt="home illustration"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
            />
          </ImageCol>
        </Row>
      </HomeContent>
      <Home2 />
    </HomeSection>
  );
}

export default Home;
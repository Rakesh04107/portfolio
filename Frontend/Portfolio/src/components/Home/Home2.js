import React from "react";
import styled from "styled-components";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
  FaLinkedinIn,
} from "react-icons/all-files";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";

const HomeAboutSection = styled.section`
  background: ${props => props.theme === "light" ? "#f8f9fa" : "#1a202c"};
  color: ${props => props.theme === "light" ? "#333" : "#fff"};
  padding: 80px 0;
`;

const Highlight = styled.span`
  color: #64ffda;
`;

const SocialIcons = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SocialIconItem = styled.li`
  margin: 0 15px;
`;

const SocialLink = styled(motion.a)`
  color: ${props => props.theme === "light" ? "#333" : "#fff"};
  font-size: 2em;
  transition: color 0.3s ease;

  &:hover {
    color: #64ffda;
    text-decoration: underline; /* Added underline for better visibility */
  }
`;

function Home2() {
  const { theme } = useTheme();

  return (
    <HomeAboutSection theme={theme}>
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <Highlight>INTRODUCE</Highlight> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a DevOps and Software Engineer with a passion for <Highlight>Cloud Technologies</Highlight>, <Highlight>AI & Automation</Highlight>.
              <br /><br />
              <Highlight>DevOps & Cloud:</Highlight> I've implemented automated solutions for cloud frameworks like AWS, harnessing the power of Docker and Jenkins for seamless deployments.
              <br /><br />
              <Highlight>AI & Machine Learning:</Highlight> Passionate about utilizing AI to solve real-world problems, evidenced by my work on projects like AI-driven code reviews and ML-models for predictions.
              <br /><br />
              I'm always exploring new horizons in <Highlight>Software Development</Highlight> using modern web technologies, which I integrate into both my professional and personal projects.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" style={{borderRadius:"10px"}}/>
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <Highlight>connect</Highlight> with me
            </p>
            <SocialIcons>
              <SocialIconItem>
                <SocialLink href="https://github.com/1md3nd" target="_blank" rel="noreferrer" theme={theme} aria-label="GitHub" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                  <AiFillGithub />
                </SocialLink>
              </SocialIconItem>
              <SocialIconItem>
                <SocialLink href="https://twitter.com/1md3nd" target="_blank" rel="noreferrer" theme={theme} aria-label="Twitter" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                  <AiOutlineTwitter />
                </SocialLink>
              </SocialIconItem>
              <SocialIconItem>
                <SocialLink href="https://www.linkedin.com/in/1md3nd/" target="_blank" rel="noreferrer" theme={theme} aria-label="LinkedIn" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                  <FaLinkedinIn />
                </SocialLink>
              </SocialIconItem>
              <SocialIconItem>
                <SocialLink href="https://www.instagram.com/1md3nd" target="_blank" rel="noreferrer" theme={theme} aria-label="Instagram" whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                  <AiFillInstagram />
                </SocialLink>
              </SocialIconItem>
            </SocialIcons>
          </Col>
        </Row>
      </Container>
    </HomeAboutSection>
  );
}

export default Home2;

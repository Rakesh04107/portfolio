import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.png"; // Use your own image here
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

function Home2() {
  const { theme } = useTheme();

  return (
    <Container
      fluid
      className={`home-about-section ${theme === "light" ? "light-theme" : "dark-theme"}`}
      id="about"
    >
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="highlight"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              I'm a DevOps and Software Engineer with a passion for
              <b className="highlight"> Cloud Technologies</b>,
              <b className="highlight"> AI & Automation</b>.
              <br />
              <br />
              <b className="highlight">DevOps & Cloud:</b> I've implemented
              automated solutions for cloud frameworks like AWS, harnessing the
              power of Docker and Jenkins for seamless deployments.
              <br />
              <br />
              <b className="highlight">AI & Machine Learning:</b> Passionate
              about utilizing AI to solve real-world problems, evidenced by my
              work on projects like AI-driven code reviews and ML-models for
              predictions.
              <br />
              <br />
              I'm always exploring new horizons in
              <b className="highlight"> Software Development</b> using modern
              web technologies, which I integrate into both my professional and
              personal projects.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="highlight">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/1md3nd"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://twitter.com/1md3nd"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiOutlineTwitter />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/1md3nd/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/1md3nd"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home2;

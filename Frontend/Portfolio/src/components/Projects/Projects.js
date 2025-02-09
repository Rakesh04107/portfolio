import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards"; // Corrected import path
import selfDrivingCarLogo from '../../Assets/self-driving-car-demo.png';

function Projects() {
  return (
    <Container fluid className="project-section">
      <Container style={{ position: "relative" }}>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={selfDrivingCarLogo}
              isBlog={false}
              title="Self-Driving Car"
              description="A self-driving car that works with a neural network from scratch."
              ghLink="https://github.com/1md3nd/portfolio/tree/main/Frontend/Portfolio/src/components/SelfDrivingCar"
              demoLink="/selfdrivingcar"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
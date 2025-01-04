import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import ParticleBackground from "../Particle";

function Projects() {
  return (
    <Container fluid className="project-section" >
      <ParticleBackground />
      <Container style={{position:"relative"}}>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath=""
              isBlog={false}
              title="Test"
              description="test"
              ghLink="test"
              demoLink="test"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;

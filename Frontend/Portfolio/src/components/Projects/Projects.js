import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import EmartApp from '../../Assets/emart.png';
import PortfolioImage from '../../Assets/portfolio.png';
import VprofileImage from '../../Assets/Vprofile.png';

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
          {/* Project 1 - EMart */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={EmartApp}
              isBlog={false}
              title="EMart Microservices App"
              description="Full-stack e-commerce deployed on AWS with Docker, Kubernetes, Nginx API Gateway, and CI/CD pipeline."
              technologies={"Angular, Node.js, Java, AWS, Docker, Kubernetes"}
            />
          </Col>

          {/* Project 2 - Portfolio */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={PortfolioImage}
              isBlog={false}
              title="Cloud Portfolio Website"
              description="Personal portfolio hosted using AWS S3, CloudFront, Route53, and automated CI/CD using GitHub Actions."
              technologies={"React, AWS S3, CloudFront, Route53, GitHub Actions"}
            />
          </Col>

          {/* Project 3 - VprofileApp Automation */}
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={VprofileImage}
              isBlog={false}
              title="Cloud Hosted Profile Portal"
              description="Build using Lift & Shift approach, migrated traditional on-premises application to AWS, ensuring high availability, scalability and security."
              technologies={"Jenkins • GitHub • Maven • SonarQube • Checkstyle • Nexus • Slack • AWS EC2"}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
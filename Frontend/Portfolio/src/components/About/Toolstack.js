import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiVisualstudio } from "react-icons/di";
import { SiLinux, SiJenkins, SiDocker, SiPostman } from "react-icons/si";

function Toolstack() {
  return (
    <Row
      style={{
        position: "relative",
        justifyContent: "center",
        paddingBottom: "50px",
      }}
    >
      <Col xs={4} md={2} className="tech-icons">
        <div className="tech-icon-wrapper">
          <SiLinux />
          <div className="icon-label">Linux</div>
        </div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <div className="tech-icon-wrapper">
          <SiJenkins />
          <div className="icon-label">Jenkins</div>
        </div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <div className="tech-icon-wrapper">
          <SiDocker />
          <div className="icon-label">Docker</div>
        </div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <div className="tech-icon-wrapper">
          <SiPostman />
          <div className="icon-label">Postman</div>
        </div>
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <div className="tech-icon-wrapper">
          <DiVisualstudio />
          <div className="icon-label">VS Code</div>
        </div>
      </Col>
    </Row>
  );
}

export default Toolstack;

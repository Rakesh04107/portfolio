import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiVisualstudio } from "react-icons/di";
import {
  SiLinux,
  SiJenkins,
  SiDocker,
  SiPostman,
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ position: "relative", justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiLinux />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiJenkins />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiDocker />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiPostman />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <DiVisualstudio />
      </Col>
    </Row>
  );
}

export default Toolstack;

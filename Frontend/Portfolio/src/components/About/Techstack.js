import React from "react";
import { Col, Row } from "react-bootstrap";
import { DiPython, DiGit, DiDocker, DiNodejs } from "react-icons/di";
import { FaAws } from "react-icons/fa";
import {
  SiKubernetes,
  SiPrometheus,
  SiGrafana,
  SiMysql,
  SiElasticsearch,
} from "react-icons/si";

function Techstack() {
  const skills = [
    { icon: <FaAws />, name: "AWS" },
    { icon: <SiKubernetes />, name: "Kubernetes" },
    { icon: <DiDocker />, name: "Docker" },
    { icon: <SiPrometheus />, name: "Prometheus" },
    { icon: <SiGrafana />, name: "Grafana" },
    { icon: <SiMysql />, name: "MySQL" },
    { icon: <SiElasticsearch />, name: "Elasticsearch" },
    { icon: <DiNodejs />, name: "Node.js" },
    { icon: <DiPython />, name: "Python" },
    { icon: <DiGit />, name: "Git" },
  ];

  return (
    <Row
      style={{
        position: "relative",
        justifyContent: "center",
        paddingBottom: "50px",
      }}
    >
      {skills.map((skill, index) => (
        <Col xs={4} md={2} className="tech-icons" key={index}>
          <div className="icon-wrapper">
            {skill.icon}
            <p className="icon-label">{skill.name}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default Techstack;

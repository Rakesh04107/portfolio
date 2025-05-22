import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">RAKESH SINGH </span>
            from <span className="purple">Faridabad, India.</span>
            <br />I’m a Cloud & DevOps Engineer with 3+ years in IT infrastructure and automation{" "}
            <span className="purple">Wipro technologies</span>.
            <br />I hold a Masters degree in Bussiness Administrator from{" "}
            <span className="purple"> J.C. Bose University of Science and Technology, YMCA </span>
            with a CGPA of 7.4.
            <br />
            <br />
            I am passionate about cloud technologies, infrastructure as code,
            and CI/CD pipelines. I work with AWS, Docker, Kubernetes,
            CI/CD, and IAC to deliver scalable solutions.
            <br />
            Additionally, I have a keen interest in software development and
            artificial intelligence, where I explore building scalable
            applications and intelligent systems.
            <br />
            <br />
            Apart from my professional interests, here are some activities I
            enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Exploring new DevOps tools and technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Experimenting with AI models and frameworks
            </li>
          </ul>

          <p style={{ color: "var(--clr-primary-a40)" }}>
            Code like an artist, think like a scientist, and dream like a child.{" "}
          </p>
          <footer className="blockquote-footer">Rakesh Singh</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

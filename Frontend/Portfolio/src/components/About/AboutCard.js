import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">RAKESH SINGH</span> from{" "}
            <span className="purple">Faridabad, India.</span>
            <br />
            I’m a Cloud & DevOps Engineer with 3+ years in IT infrastructure and automation{" "}
            at <span className="purple">Wipro Technologies</span>.
            <br />
            I hold a Bachelor's degree in Technology (B-TECH) from{" "}
            <span className="purple">UIET, Kurukshetra University, Kurukshetra</span> (2020) with a CGPA of 6.5, 
            <br />
            and a Master's degree in Business Administration (MBA) from{" "}
            <span className="purple">J.C. Bose University of Science and Technology, YMCA Faridabad</span> (2023) with a CGPA of 7.4.
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
            Apart from my professional interests, here are some activities I enjoy:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Exploring new DevOps tools and technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Experimenting with AI models and frameworks
            </li>
          </ul>

          <br />
          <h1 className="project-heading" style={{ position: "relative" }}>
          Certifications <strong className="purple">:- </strong>
        </h1>
          <ul>
            <li><ImPointRight /> AWS Cloud Practitioner</li>
            <li><ImPointRight /> AWS Solutions Architect – Associate</li>
            <li><ImPointRight /> Introduction to DevOps</li>
            <li><ImPointRight /> DevOps on AWS and Project Management</li>
            <li><ImPointRight /> DevOps Beginner to Advanced with Projects</li>
            <li><ImPointRight /> Cyber Security Awareness Programme</li>
          </ul>

          <p style={{ color: "var(--clr-primary-a40)" }}>
            Code like an artist, think like a scientist, and dream like a child.
          </p>
          <footer className="blockquote-footer">Rakesh Singh</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Anurag Ranjan </span>
            from <span className="purple">Delhi, India.</span>
            <br />I am currently working as a DevOps Trainee Engineer at{" "}
            <span className="purple">Impressico Business Solutions</span>.
            <br />I hold a B.Tech degree in Information Technology from{" "}
            <span className="purple">KIET Group of Institutions </span>
            with a CGPA of 8.14.
            <br />
            <br />
            I am passionate about cloud technologies, infrastructure as code,
            and CI/CD pipelines. I have hands-on experience with tools like AWS,
            Docker, and Kubernetes.
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
              <ImPointRight /> Solving coding challenges on LeetCode
            </li>
            <li className="about-activity">
              <ImPointRight /> Exploring new DevOps tools and technologies
            </li>
            <li className="about-activity">
              <ImPointRight /> Participating in tech meetups and hackathons
            </li>
            <li className="about-activity">
              <ImPointRight /> Experimenting with AI models and frameworks
            </li>
          </ul>

          <p style={{ color: "var(--clr-primary-a40)" }}>
            Code like an artist, think like a scientist, and dream like a child.{" "}
          </p>
          <footer className="blockquote-footer">Anurag Ranjan</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;

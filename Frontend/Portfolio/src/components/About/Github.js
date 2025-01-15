import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";

function Github() {
  return (
    <Row
      style={{
        position: "relative",
        justifyContent: "center",
        paddingBottom: "50px",
      }}
    >
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong style={{ color: "var(--clr-primary-a20)" }}>Code</strong>
      </h1>
      <GitHubCalendar
        username="1md3nd"
        blockSize={15}
        blockMargin={5}
        color="var(--imp-text-color)" // Updated to CSS variable
        fontSize={16}
      />
    </Row>
  );
}

export default Github;

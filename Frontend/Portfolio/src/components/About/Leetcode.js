import React from "react";
import LeetCodeCalendar from "leetcode-calendar";
import { Row } from "react-bootstrap";

function Leetcode() {
  const exampleTheme = {
    light: [
      'rgba(235, 235, 235, 0.5)', // Light background color
      '#fe4f2e', // clr-primary-a10
      '#ff6a47', // clr-primary-a20
      '#ff8260', // clr-primary-a30
      '#ff9879', // clr-primary-a40
    ],
    dark: [
      'rgba(235, 235, 235, 0.9)', // Dark background color
      '#fe4f2e', // clr-primary-a10
      '#ff6a47', // clr-primary-a20
      '#ff8260', // clr-primary-a30
      '#ff9879', // clr-primary-a40
    ],
  };

  return (
    <Row style={{ position: "relative", justifyContent: "center", paddingBottom: "50px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code </strong>Leetcode
      </h1>
      <LeetCodeCalendar
        username="1md3nd"
        blockSize={15}
        blockMargin={5}
        fontSize={15}
        theme={exampleTheme}
        style={{ borderRadius: '8px', overflow: 'hidden', width: "auto" }}
      />
    </Row>
  );
}

export default Leetcode;
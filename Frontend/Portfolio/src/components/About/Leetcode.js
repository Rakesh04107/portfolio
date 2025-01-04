import React from "react";
import LeetCodeCalendar from "leetcode-calendar";
import { Row } from "react-bootstrap";

function Leetcode() {
    const exampleTheme = {
        light: [
          'rgba(235, 235, 235,0.5)',
          'rgba(192, 132, 245, 0.44)',
          'rgba(192, 132, 245, 0.6)',
          'rgba(192, 132, 245, 0.76)',
          'rgba(192, 132, 245, 0.92)',
        ],
        dark: [
            'rgba(235, 235, 235,0.9)',
          'rgba(192, 132, 245, 0.44)',
          'rgba(192, 132, 245, 0.6)',
          'rgba(192, 132, 245, 0.76)',
          'rgba(192, 132, 245, 0.92)',
        ],
      }

  return (
    <Row style={{position:"relative", justifyContent: "center", paddingBottom: "10px"}}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        Days I <strong className="purple">Code </strong>Leetcode
      </h1>
        <LeetCodeCalendar
          username="1md3nd"
          blockSize={15}
          blockMargin={5}
          fontSize={15}
          theme={exampleTheme}
          style={{ borderRadius: '8px', overflow: 'hidden'  ,width:"auto"}}
        />
    </Row>
  );
}

export default Leetcode;

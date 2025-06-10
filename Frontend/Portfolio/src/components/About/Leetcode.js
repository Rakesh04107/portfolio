import React from "react";
// import LeetCodeCalendar from "leetcode-calendar"; // ❌ Comment this
import { Row } from "react-bootstrap";

// const exampleTheme = { ... } // ❌ Also comment or remove this

function Leetcode() {
  return (
    <Row
      style={{
        position: "relative",
        justifyContent: "center",
        paddingBottom: "50px",
      }}
    >
      {/* LeetCodeCalendar is temporarily disabled */}
    </Row>
  );
}

export default Leetcode;

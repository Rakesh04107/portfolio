import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { visualizersetup } from "./visualizer";
import refresh from "../../Assets/refresh.png";
import savebtn from "../../Assets/save.png";
import deletebtn from "../../Assets/delete.png";
import {
  setup,
  visualizer,
  draw,
  keyPressed,
  keyReleased,
  save,
  deleteBrain,
  randomTraffic,
} from "./Sketch";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { Container, Row, Col, Button, Image, Card } from "react-bootstrap"; // Import Bootstrap components

function DrivingCar() {
  const sketchRef = useRef();
  const networkCanvasRef = useRef();
  const p5Instance = useRef(null);
  const p5Instance2 = useRef(null);

  useEffect(() => {
    const preventDefault = true; // Move inside useEffect

    p5Instance.current = new p5((p) => {
      p.setup = () => {
        setup(p);
      };
      p.draw = () => {
        draw(p); // Call the draw function from Sketch
      };
      p.keyPressed = () => {
        keyPressed(p); // Call the keyPressed function from Sketch
      };
      p.keyReleased = () => {
        keyReleased(p); // Call the keyReleased function from Sketch
      };
    }, sketchRef.current);

    p5Instance2.current = new p5((p2) => {
      p2.setup = () => {
        visualizersetup(p2);
      };
      p2.draw = () => {
        visualizer(p2);
      };
    }, networkCanvasRef.current);

    const handleGlobalKeyPress = (event) => {
      if (preventDefault) {
        event.preventDefault(); // Prevent default behavior for the specified key(s)
      }
    };

    const intervalId = setInterval(() => {
      randomTraffic();
    }, 3000);

    window.addEventListener("keydown", handleGlobalKeyPress);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("keydown", handleGlobalKeyPress);
      p5Instance.current.remove();
      p5Instance2.current.remove();
    };
  }, []);

  function saveCar() {
    save();
  }

  function deleteCar() {
    deleteBrain();
  }

  function refreshCanvas() {
    window.location.reload();
  }

  return (
    <Container
      fluid
      className="text-white"
      style={{ paddingTop: "100px", paddingBottom: "70px" }}
    >
      <h1 className="project-heading">
        Self Driving <strong className="purple"> Car</strong>
      </h1>

      <Container fluid style={{ paddingTop: "50px", position: "relative" }}>
        <Row className="mt-3">
          <Col md={4} sm={12}>
            <div
              ref={sketchRef}
              className="canvascar"
              style={{ border: "1px solid #ccc" }}
            ></div>
          </Col>
          <Col>
            <div
              ref={networkCanvasRef}
              className="network"
              style={{ border: "1px solid #ccc" }}
            ></div>
          </Col>
          <Col md={4} sm={12}>
            <Card className="mb-3">
              <Card.Body>
                <Button
                  variant="primary"
                  onClick={refreshCanvas}
                  className="mb-2 w-100 d-flex align-items-center justify-content-center"
                >
                  <Image
                    src={refresh}
                    alt="Refresh"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Reload if not performing well
                </Button>
                <Button
                  variant="success"
                  onClick={saveCar}
                  className="mb-2 w-100 d-flex align-items-center justify-content-center"
                >
                  <Image
                    src={savebtn}
                    alt="Save"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Save the current best car
                </Button>
                <Button
                  variant="danger"
                  onClick={deleteCar}
                  className="mb-2 w-100 d-flex align-items-center justify-content-center"
                >
                  <Image
                    src={deletebtn}
                    alt="Delete"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Delete the saved car
                </Button>
                <Card.Text className="mt-3">
                  By saving the best cars several times, we can achieve a fully
                  self-driving car.
                </Card.Text>
                <Card.Text>
                  Use a wide screen like a laptop or PC for a better view.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default DrivingCar;

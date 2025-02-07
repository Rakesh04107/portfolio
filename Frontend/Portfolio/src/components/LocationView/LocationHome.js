import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
} from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useGeolocated } from "react-geolocated";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
  Graticule,
  Sphere,
} from "react-simple-maps";

function LocationHome() {
  const [sessionId, setSessionId] = useState("");
  const [allLocationData, setAllLocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userMessage, setUserMessage] = useState(""); // State for storing custom message input

  // Geolocation hook
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true, // use high accuracy for better results
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    const generatedSessionId = uuidv4();
    setSessionId(generatedSessionId);
    getLocationData();
  }, []);

  const getLocationData = async () => {
    try {
      const response = await fetch(
        "https://2o0zalvx4i.execute-api.us-east-1.amazonaws.com/location"
      );
      if (!response.ok)
        throw new Error(
          `Failed to fetch location data: ${response.statusText}`
        );
      const data = await response.json();
      setAllLocationData(data);
    } catch (error) {
      setErrorMessage("Error fetching all location data.");
      console.error("Error fetching location data:", error);
    } finally {
      setLoading(false);
    }
  };

  const sendLocationData = async () => {
    if (!coords) {
      setErrorMessage("Location data not available.");
      return;
    }

    const payload = {
      session_id: sessionId,
      latitude: coords.latitude,
      longitude: coords.longitude,
      message: userMessage,
    };

    try {
      const response = await fetch(
        "https://2o0zalvx4i.execute-api.us-east-1.amazonaws.com/location",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        console.log("Location data sent successfully.");
        getLocationData();
      } else {
        throw new Error("Failed to send location data.");
      }
    } catch (error) {
      setErrorMessage("Error sending location data.");
      console.error("Error sending location data:", error);
    }
  };

  return (
    <Container fluid className="project-section" style={{ color: "white" }}>
      <Container
        fluid
        className="location-content"
        style={{ background: "#343a40", padding: "10px" }}
      >
        <h1>Location Data</h1>
        <Row>
          <Col>
            {/* Show spinner while loading location data */}
            {loading && (
              <Spinner animation="border" role="status" variant="light">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}

            {/* Show error message if there's an issue */}
            {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

            {/* Handle geolocation availability */}
            {!isGeolocationAvailable ? (
              <div>Your browser does not support Geolocation</div>
            ) : !isGeolocationEnabled ? (
              <div>Geolocation is not enabled</div>
            ) : coords ? (
              <div className="mb-4" text="white" bg="dark" background="#343a40">
                <Row>
                  <Col>
                    <h2>Your Coordinates:</h2>
                  </Col>
                  <Col>
                    Latitude: {coords.latitude} <br />
                    Longitude: {coords.longitude}
                  </Col>
                </Row>
              </div>
            ) : (
              <div>Getting the location data…</div>
            )}

            {/* Input for the user to enter a custom message */}
            <Form.Group controlId="userMessage" className="mb-4">
              <Form.Control
                type="text"
                placeholder="Enter your custom message"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)} // Update the state with the input value
                style={{
                  fontSize: "1rem",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  transition: "0.3s",
                }}
              />
            </Form.Group>

            {/* Button to send location data */}
            <Button
              variant="primary"
              onClick={sendLocationData}
              style={{
                fontSize: "1.2rem",
                padding: "12px 30px",
                borderRadius: "50px",
                background: "linear-gradient(to right, #6a11cb, #2575fc)",
                border: "none",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background =
                  "linear-gradient(to right, #2575fc, #6a11cb)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background =
                  "linear-gradient(to right, #6a11cb, #2575fc)")
              }
            >
              Add my Message
            </Button>
          </Col>
          <Col>
            <h2>Total Counts</h2>
            <div>
              <h3 style={{ color: "#F0F0F0" }}>{allLocationData.length}</h3>
            </div>
          </Col>
        </Row>
      </Container>

      <Container
        fluid
        className="location-map-section"
        style={{ padding: "40px" }}
      >
        <ComposableMap projection="geoEqualEarth">
          <Sphere stroke="#DDD" />
          <Graticule stroke="#DDD" />
          <ZoomableGroup center={[20, 0]} zoom={1}>
            <Geographies
              geography="/features.json"
              stroke="#FFF"
              strokeWidth={0.5}
            >
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    stroke="white"
                    style={{
                      default: {
                        fill: "#428197",
                        outline: "none",
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none",
                      },
                      pressed: {
                        outline: "none",
                      },
                    }}
                  />
                ))
              }
            </Geographies>

            {/* All locations saved */}
            {allLocationData.length > 0
              ? allLocationData.map((location, index) => (
                  <Marker
                    key={index}
                    coordinates={[location.longitude, location.latitude]}
                  >
                    <circle r={0.5} fill="#000000" />
                    <text
                      textAnchor="middle"
                      y={-8}
                      style={{
                        fontSize: 8,
                        fontFamily: "Arial",
                        backgroundColor: '#FFFF00', // Add a background color to all texts
                        fill: "#000000",
                        padding: "2px",
                        borderRadius: "3px",
                      }}
                      >
                      {location.message}
                    </text>
                  </Marker>
                ))
              : null}

            {/* Current User */}
            {coords ? (
              <Marker coordinates={[coords.longitude, coords.latitude]}>
                <circle r={1} fill="#FFFF00" />
                <text
                  textAnchor="middle"
                  y={-8} // Adjust the y value to position the text above/below the marker
                  style={{
                    fontSize: 8,
                    fontFamily: "Arial",
                    fill: "#FFFF00",
                    padding: "2px",
                    borderRadius: "3px",
                  }}
                >
                  {userMessage}
                </text>
                <text
                  textAnchor="middle"
                  y={8} // Adjust the y value to position the text above/below the marker
                  style={{
                    fontSize: 5, // Smaller font size for subtlety
                    fontFamily: "Arial",
                    fill: "#575757",
                    opacity: 0.7, // Reduce opacity for a softer look
                    padding: "2px",
                    borderRadius: "3px",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)", // Soft text shadow for legibility
                  }}
                >
                  {"You r here."}
                </text>
              </Marker>
            ) : null}
          </ZoomableGroup>
        </ComposableMap>
      </Container>
    </Container>
  );
}

export default LocationHome;

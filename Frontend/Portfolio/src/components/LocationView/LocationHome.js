import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
  Table,
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
} from "react-simple-maps";
import { MdLocationOn } from "react-icons/md";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { formatDistanceToNow } from "date-fns";

function LocationHome() {
  const [sessionId, setSessionId] = useState(uuidv4());
  const [allLocationData, setAllLocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [userMessage, setUserMessage] = useState("");
  const [state, setState] = useState("N/A");
  const [country, setCountry] = useState("N/A");

  const { coords } = useGeolocated({
    positionOptions: { enableHighAccuracy: true },
    userDecisionTimeout: 5000,
  });
  useEffect(() => {
    const generatedSessionId = uuidv4();
    setSessionId(generatedSessionId);
  }, []);

  // Fetch all location data
  const getLocationData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://2o0zalvx4i.execute-api.us-east-1.amazonaws.com/location"
      );
      if (!response.ok)
        throw new Error(
          `Failed to fetch location data: ${response.statusText}`
        );
      const data = await response.json();
      const sortedData = [...data].sort((a, b) => {
        const timestampA = parseInt(a.timestamp, 10);
        const timestampB = parseInt(b.timestamp, 10);
        return timestampB - timestampA; // Descending order
      });
      setAllLocationData(sortedData);
    } catch (error) {
      setErrorMessage("Error fetching all location data.");
      console.error("Error fetching location data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Send current location data
  const sendLocationData = useCallback(async () => {
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
          headers: { "Content-Type": "application/json" },
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
  }, [coords, sessionId, userMessage, getLocationData]);

  // Update local state based on location data
  const updateLocalLocation = useCallback(() => {
    if (coords && allLocationData.length > 0) {
      const locationMatch = allLocationData.find(
        (loc) =>
          loc.latitude === coords.latitude.toString() &&
          loc.longitude === coords.longitude.toString()
      );

      if (locationMatch) {
        setUserMessage(locationMatch.message || "No message");
        setState(locationMatch.state || "N/A");
        setCountry(locationMatch.country || "N/A");
      } else {
        setState("N/A");
        setCountry("N/A");
      }
    }
  }, [coords, allLocationData]);

  // Fetch location data on mount
  useEffect(() => {
    getLocationData();
  }, [getLocationData]);

  // Update local state when location data changes
  useEffect(() => {
    updateLocalLocation();
  }, [allLocationData, coords, updateLocalLocation]);

  // Check if the user's location is already stored, else send it
  useEffect(() => {
    if (coords && allLocationData.length > 0) {
      const locationExists = allLocationData.some(
        (loc) =>
          loc.latitude === coords.latitude.toString() &&
          loc.longitude === coords.longitude.toString()
      );

      if (!locationExists) {
        sendLocationData();
      }
    }
  }, [coords, sendLocationData, allLocationData]);

  const highlightCurrentLocation = (loc) => {
    if (coords && loc) {
      const lat1 = parseFloat(loc.latitude);
      const lng1 = parseFloat(loc.longitude);
      const lat2 = coords.latitude;
      const lng2 = coords.longitude;
  
      const latDiff = Math.abs(lat1 - lat2);
      const lngDiff = Math.abs(lng1 - lng2);
  
      const tolerance = 0.0001; // Adjust as needed
  
      return latDiff < tolerance && lngDiff < tolerance;
    }
    return false;
  };
  return (
    <Container
      fluid
      className="text-white"
      style={{ paddingTop: "100px", paddingBottom: "70px" }}
    >
      <h1 className="project-heading">
        <strong className="purple">Location</strong> Game
      </h1>

      <Container fluid style={{ paddingTop: "50px", position: "relative" }}>
        {loading && <Spinner animation="border" variant="dark" />}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Row>
          {/* Coordinates Section */}
          <Col md={6}>
            <div className="card p-3 shadow-sm">
              <h3>Your Place:</h3>
              {state && (
                <p>
                  <strong>State:</strong> {state} <br />
                  <strong>Country:</strong> {country}
                </p>
              )}
              <Form.Group controlId="userMessage">
                <Form.Label>Enter a message:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your message here"
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  className="mb-3"
                />
              </Form.Group>
              <Button onClick={sendLocationData} className="w-100">
                Add my Message
              </Button>
            </div>
          </Col>

          {/* Data Table Section */}
          <Col md={6}>
            <div className="card p-3 shadow-sm">
              <h3>Total Entries: {allLocationData.length}</h3>
              <div
                style={{
                  maxHeight: "calc(8 * 41px)",
                  padding: "0",
                  overflowY: "auto",
                }}
              >
                <Table
                  bordered
                  hover
                  variant="dark"
                  responsive
                  className=""
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>When</th>
                      <th>Message</th>
                      <th>State</th>
                      <th>Country</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allLocationData.map((loc, index) => {
                      const isHighlighted = highlightCurrentLocation(loc);
                      const timestamp = formatDistanceToNow(
                        new Date(parseInt(loc.timestamp, 10) * 1000),
                        { addSuffix: true }
                      );
                      var bColor = "";
                      if (isHighlighted) {
                        bColor = "var(--imp-text-color)";
                      }
                      return (
                        <tr key={index} className={
                          isHighlighted ? "text-light": ""
                        }>
                          <td
                            style={{
                              backgroundColor: bColor,
                            }}
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{
                              backgroundColor: bColor,
                            }}
                          >
                            {timestamp}
                          </td>
                          <td
                            style={{
                              backgroundColor: bColor,
                            }}
                          >
                            {loc.message || "No message"}
                          </td>
                          <td
                            style={{
                              backgroundColor: bColor,
                            }}
                          >
                            {loc.state || "N/A"}
                          </td>
                          <td
                            style={{
                              backgroundColor: bColor,
                            }}
                          >
                            {loc.country || "N/A"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      {coords && (
        <Container
          className="mt-4"
          style={{
            maxHeight: "1000px",
            maxWidth: "none",
            paddingRight: "70px",
            border: "1px solid rgb(255, 255, 255)",
          }}
        >
          <ComposableMap
            projectionConfig={{
              scale: 205,
              rotation: [-101, 0, 0],
            }}
            width={900}
            height={400}
          >
            <ZoomableGroup
              center={[coords.longitude, coords.latitude]}
              zoom={1.5}
            >
              <Geographies
                geography="/features.json"
                stroke="#FFF"
                strokeWidth={0.3}
              >
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: { fill: "#428197", outline: "none" },
                        hover: { fill: "whitesmoke", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {allLocationData.map((location, index) => (
                <Marker
                  key={index}
                  coordinates={[location.longitude, location.latitude]}
                >
                  <g transform="translate(-5, -10)">
                    <MdLocationOn size={10} color="black" />
                  </g>
                </Marker>
              ))}

              <Marker coordinates={[coords.longitude, coords.latitude]}>
                <g transform="translate(-3.5, -3.5)">
                  <FaLocationCrosshairs size={7} color="yellow" />
                </g>
                <text
                  textAnchor="middle"
                  dy={-15} // Adjusts text position above the icon
                  style={{ fontSize: "5px", fill: "#FFFF00" }}
                >
                  {"You are here"}
                </text>
              </Marker>
            </ZoomableGroup>
          </ComposableMap>
        </Container>
      )}
    </Container>
  );
}

export default LocationHome;

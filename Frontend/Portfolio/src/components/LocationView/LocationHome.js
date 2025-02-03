import React, { useState, useEffect } from "react";
import { Container, Button, Card, Row, Col, Spinner, Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function LocationHome() {
  const [locationData, setLocationData] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const [allLocationData, setAllLocationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const generatedSessionId = uuidv4();
    setSessionId(generatedSessionId);
    fetchIp();
    getLocationData();
  }, []);

  const fetchIp = async () => {
    try {
      const response = await fetch('https://geolocation-db.com/json/');
      const data = await response.json();
      setLocationData(data);
    } catch (error) {
      setErrorMessage("Error fetching IP address.");
      console.error("Error fetching IP address:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocationData = async () => {
    try {
      const response = await fetch('https://2o0zalvx4i.execute-api.us-east-1.amazonaws.com/location');
      if (!response.ok) throw new Error(`Failed to fetch location data: ${response.statusText}`);
      const data = await response.json();
      setAllLocationData(data);
    } catch (error) {
      setErrorMessage("Error fetching all location data.");
      console.error("Error fetching location data:", error);
    }
  };

  const sendLocationData = async () => {
    if (!locationData) {
      setErrorMessage("Location data not available.");
      return;
    }

    const payload = {
      session_id: sessionId,
      ...locationData,
    };

    try {
      const response = await fetch('https://2o0zalvx4i.execute-api.us-east-1.amazonaws.com/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log("Location data sent successfully.");
      } else {
        throw new Error("Failed to send location data.");
      }
    } catch (error) {
      setErrorMessage("Error sending location data.");
      console.error("Error sending location data:", error);
    }
  };

  return (
    <Container fluid className="project-section" style={{ color: 'white' }}>
      <h1>Location Data</h1>
      {loading ? (
        <Spinner animation="border" role="status" variant="light">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : null}

      {errorMessage && (
        <Alert variant="danger">
          {errorMessage}
        </Alert>
      )}

      {locationData && !loading && (
        <Card className="mb-4" bg="dark" text="white">
          <Card.Body>
            <Row>
              <Col md={4}>
                <Card.Title>Your IP Address:</Card.Title>
                <Card.Text>{locationData.IPv4}</Card.Text>
              </Col>
              <Col md={4}>
                <Card.Title>Location:</Card.Title>
                <Card.Text>
                  {locationData.city}, {locationData.country_name}
                </Card.Text>
              </Col>
              <Col md={4}>
                <Card.Title>Coordinates:</Card.Title>
                <Card.Text>
                  Latitude: {locationData.latitude} <br />
                  Longitude: {locationData.longitude}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}

      <Button variant="primary" onClick={sendLocationData}>
        Send Location Data
      </Button>

      <Container fluid className="mt-4">
        <h3>All Collected Location Data</h3>
        <ul>
          {allLocationData.length > 0 ? (
            allLocationData.map((location, index) => (
              <Card key={index} className="mb-2" bg="dark" text="white">
                <Card.Body>
                  <Card.Title>Session ID: {location.session_id}</Card.Title>
                  <Card.Text>
                    Latitude: {location.latitude} <br />
                    Longitude: {location.longitude}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No location data available.</p>
          )}
        </ul>
      </Container>
    </Container>
  );
}

export default LocationHome;
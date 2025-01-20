import React, { useState, useEffect } from "react";
import { Container, Button } from "react-bootstrap";

function LocationHome() {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    async function fetchIp() {
      try {
        const response = await fetch('https://geolocation-db.com/json/');
        const data = await response.json();
        setLocationData(data); // Store the entire data object
        console.log(data);
      } catch (error) {
        console.error("Error fetching IP address:", error);
      }
    }

    fetchIp();
  }, []); // Empty dependency array means this effect runs once on mount

  const sendLocationData = async () => {
    if (!locationData) {
      console.error("Location data not available.");
      return;
    }

    try {
      const response = await fetch('https://udip29qjxa.execute-api.us-east-1.amazonaws.com/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(locationData) // Send the entire location data
      });

      if (response.ok) {
        console.log("Location data sent successfully.");
      } else {
        console.error("Failed to send location data.");
      }
    } catch (error) {
      console.error("Error sending location data:", error);
    }
  };

  return (
    <Container fluid className="project-section" style={{ color: 'white' }}>
      <h1>Hi</h1>
      {locationData && <p>Your IP address is: {locationData.IPv4}</p>}
      <Button variant="primary" onClick={sendLocationData}>
        Send Location Data
      </Button>
    </Container>
  );
}

export default LocationHome;
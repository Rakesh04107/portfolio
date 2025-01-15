import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider
import Preloader from "./components/Pre";
import AppContent from "./components/AppContent"; // Import AppContent component

import "./App.css";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <ThemeProvider> {/* Wrap the entire app with ThemeProvider */}
        <Preloader load={load} />
        <AppContent load={load} />
      </ThemeProvider>
    </Router>
  );
}

export default App;

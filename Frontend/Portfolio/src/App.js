import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import CustomCursor from './components/CustomCursor/CustomCursor';
import { ParallaxProvider } from 'react-scroll-parallax';
import './App.css';

const AppContent = lazy(() => import('./components/AppContent'));

function App() {
  return (
    <ThemeProvider>
      <ParallaxProvider>
        <CustomCursor />
        <Suspense fallback={<div>Loading...</div>}>
          <AppContent />
        </Suspense>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default App;
import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarComponent from './NavbarComponent';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';

// Enhanced LoadingSpinner with modern design
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
  </div>
);

// Lazy load components
const Home = lazy(() => import('./Home/Home'));
const About = lazy(() => import('./About/About'));
const Projects = lazy(() => import('./Projects/Projects'));
const Resume = lazy(() => import('./Resume/ResumeNew'));
const Blog = lazy(() => import('./Blogs/Blog'));
const BlogRead = lazy(() => import('./Blogs/BlogRead'));
const LocationHome = lazy(() => import('./LocationView/LocationHome'));
const DrivingCar = lazy(() => import('./SelfDrivingCar/DrivingCar'));

// Page transition animation
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: 'easeInOut' } // Smoother easing
};

function AppContent() {
  const location = useLocation();

  return (
    <motion.div 
      className="App bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageTransition}
    >
      <NavbarComponent />
      <ScrollToTop />
      
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/about" element={<About />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:blogId" element={<BlogRead />} />
            <Route path="/location" element={<LocationHome />} />
            <Route path="/selfdrivingcar" element={<DrivingCar />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AnimatePresence>

      <Footer />
    </motion.div>
  );
}

export default AppContent;
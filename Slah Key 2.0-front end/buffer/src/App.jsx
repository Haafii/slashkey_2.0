import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Workout from './pages/Workout';
// import VideoStream from './pages/VideoStream';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="home/workout" element={<Workout />} />
          {/* <Route path="video-stream" element={<VideoStream />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;


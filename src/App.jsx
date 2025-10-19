import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './components/navigation-bar';
import './App.css';
import NavigationBar from './components/navigation-bar';

function App() {

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/about" element={<div>About Page</div>} />
      </Routes>
    </Router>

  );
}

export default App

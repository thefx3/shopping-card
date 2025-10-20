import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './components/navigation-bar';
import './App.css';
import NavigationBar from './components/navigation-bar';
import Home from '../src/pages/home';
import Space from './components/space';

function App() {

  return (
    <Router>
      <NavigationBar />
      <Routes>
        
        <Route path="/" element={ <Home /> } />
      </Routes>
    </Router>

  );
}

export default App

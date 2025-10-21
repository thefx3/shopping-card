import { useState } from 'react'
import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './components/navigation-bar';
import './App.css';
import NavigationBar from './components/navigation-bar';
import Home from '../src/pages/home'
import Store from '../src/pages/store-page'
import ProductPage from "../src/pages/product-page";

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/store/:productId" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;
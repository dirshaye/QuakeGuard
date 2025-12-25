import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SafetyForm from './components/SafetyForm';
import FeltReportForm from './components/FeltReportForm';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/safety" element={<SafetyForm />} />
        <Route path="/report" element={<FeltReportForm />} />
      </Routes>
    </Router>
  );
}

export default App;

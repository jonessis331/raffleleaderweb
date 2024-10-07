// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Templates from "./pages/Templates";
import SetUp from "./pages/SetUp";
import Publish from "./pages/Publish";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/templates" />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/setup" element={<SetUp />} />
        <Route path="/publish" element={<Publish />} />
      </Routes>
    </Router>
  );
}

export default App;

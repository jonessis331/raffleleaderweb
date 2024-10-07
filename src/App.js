// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
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
        <Route exact path="/" render={() => <Navigate to="/templates" />} />
        <Route path="/templates" component={Templates} />
        <Route path="/setup" component={SetUp} />
        <Route path="/publish" component={Publish} />
      </Routes>
    </Router>
  );
}

export default App;

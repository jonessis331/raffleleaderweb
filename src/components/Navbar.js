// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/templates">Templates</Link>
        </li>
        <li>
          <Link to="/setup">Set Up</Link>
        </li>
        <li>
          <Link to="/publish">Publish</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

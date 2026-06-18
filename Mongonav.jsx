import React from 'react'
import './Mongonav.css';
import { Link } from "react-router-dom"

export const Mongonav = () => {
  return (
    <nav className="navbar">
        <div className="logo">nabvar</div>

        <ul >
          <li><Link to="/">Register</Link></li>
          <li><Link to="/Mongoose1">Login</Link></li>
          <li><Link to="/Home">Home</Link></li>
        </ul>
    </nav>
  );
};
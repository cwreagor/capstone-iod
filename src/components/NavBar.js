import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import logoGif from "../assets/studyzone.gif";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="hamburger-nav">
      
      <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
        <img src={logoGif} alt="Study Zone Logo" className="nav-gif" />
      </Link>

      <div
        className={`hamburger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {open && (
        <div className="nav-menu">
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
              <Link to="/science" onClick={() => setOpen(false)}>Science</Link>
              <Link to="/mythology" onClick={() => setOpen(false)}>Mythology</Link>
              <Link to="/history" onClick={() => setOpen(false)}>History</Link>
              <Link to="/math" onClick={() => setOpen(false)}>Math</Link>
              <Link to="/literature" onClick={() => setOpen(false)}>Literature</Link>
              <Link to="/trivia" onClick={() => setOpen(false)}>Trivia</Link>
            </div>
          )
      }
    </nav>
);
}
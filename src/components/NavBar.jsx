import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import logoGif from "../assets/studyzone.gif";
import { useAuth } from "../controllers/AuthContext";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);
  const { user, logout } = useAuth();

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

          {!user && (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setOpen(false)}>Sign Up</Link>
            </>
          )}

          {user && (
            <button
              className="logout-btn"
              onClick={() => {
                logout();
                setOpen(false);
              }}
            >
              Logout
            </button>
          )}

          {/* SUBJECTS DROPDOWN */}
          <div
            className="subjects-toggle"
            onClick={() => setSubjectsOpen(!subjectsOpen)}
          >
            Subjects {subjectsOpen ? "▲" : "▼"}
          </div>

          {subjectsOpen && (
            <div className="subjects-dropdown">
              <Link to="/science" onClick={() => setOpen(false)}>Science</Link>
              <Link to="/mythology" onClick={() => setOpen(false)}>Mythology</Link>
              <Link to="/history" onClick={() => setOpen(false)}>History</Link>
              <Link to="/math" onClick={() => setOpen(false)}>Math</Link>
              <Link to="/literature" onClick={() => setOpen(false)}>Literature</Link>
              <Link to="/trivia" onClick={() => setOpen(false)}>Trivia</Link>
            </div>
          )}

        </div>
      )}
    </nav>
  );
}
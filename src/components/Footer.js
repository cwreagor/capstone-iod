import React from "react";
import "../style.css";

export default function Footer() {
  return (
    <footer className="app-footer">
      <p>© {new Date().getFullYear()} Study Zone — Created by Chase Reagor 2025</p>
    </footer>
  );
}
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Science from "./pages/Science";
import Mythology from "./pages/Mythology";
import History from "./pages/History";
import Mathematics from "./pages/Mathematics";
import Literature from "./pages/Literature";
import RandomTrivia from "./pages/RandomTrivia";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/science" element={<Science />} />
        <Route path="/mythology" element={<Mythology />} />
        <Route path="/history" element={<History />} />
        <Route path="/literature" element={<Literature />} />
        <Route path="/math" element={<Mathematics />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/trivia" element={<RandomTrivia />} />
      </Routes>
      
      <Footer />
    </Router>
  );
}
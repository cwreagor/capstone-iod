import React, { useState } from "react";
import { useAuth } from "../controllers/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

  // EMAIL VALIDATOR
  const validEmail = (email) => {
    return (
      email.includes("@") &&
      (email.endsWith(".com") ||
        email.endsWith(".net") ||
        email.endsWith(".org") ||
        email.endsWith(".edu") ||
        email.endsWith(".gov"))
    );
  };

  // PASSWORD VALIDATOR
  const validPassword = (pw) => {
    const hasUpper = /[A-Z]/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    return pw.length >= 8 && hasUpper && hasSpecial;
  };

  // HANDLE LOGIN SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (locked) return;

    setError("");

    // Validate email/password format
    if (!validEmail(email)) {
      return setError("Invalid email format.");
    }
    if (!validPassword(pw)) {
      return setError(
        "Password must be 8+ characters, include a capital letter, & a special character."
      );
    }

    try {
      await login(email, pw);

      setError("Login successful!");
      setTimeout(() => navigate("/"), 800);

    } catch (err) {
      setError(err.message);
      handleAttempt();
    }
  };

  // HANDLE FAILED LOGIN ATTEMPTS
  const handleAttempt = () => {
    if (locked) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (newAttempts >= 3) {
      setLocked(true);
      setError("Too many failed login attempts. Try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          disabled={locked}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          disabled={locked}
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <button disabled={locked}>Login</button>

        {error && <p className="auth-error">{error}</p>}
      </form>
    </div>
  );
}
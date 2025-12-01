import React, { useState } from "react";
import { useAuth } from "../controllers/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validEmail(email)) {
      return setError("Invalid email format.");
    }
    if (!validPassword(pw)) {
      return setError(
        "Password must be 8+ characters, include a capital letter, & a special character."
      );
    }

    try {
      await signup(email, pw);

      setSuccess("Account created successfully!");
      setEmail("");
      setPw("");

      setTimeout(() => navigate("/"), 800);

    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Sign Up</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />

        <button>Create Account</button>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
      </form>
    </div>
  );
}
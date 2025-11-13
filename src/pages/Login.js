import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [locked, setLocked] = useState(false);

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

  const validPassword = (pw) => {
    const hasUpper = /[A-Z]/.test(pw);
    const hasSpecial = /[^A-Za-z0-9]/.test(pw);
    return pw.length >= 8 && hasUpper && hasSpecial;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (locked) return;

    if (!validEmail(email)) {
      return setError("Invalid email format.");
    }

    if (!validPassword(pw)) {
      return setError(
        "Password must be 8+ characters, include a capital letter, & a special character."
      );
    }

    // Fake login success
    setError("Login successful!");
  };

  const handleAttempt = () => {
    if (locked) return;

    setAttempts(attempts + 1);

    if (attempts + 1 >= 3) {
      setLocked(true);
      setError("Too many failed login attempts. Please try again later.");
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Login</h1>

      <form
        className="auth-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
          handleAttempt();
        }}
      >
        <input
          type="email"
          placeholder="Email"
          disabled={locked}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          disabled={locked}
          onChange={(e) => setPw(e.target.value)}
        />

        <button disabled={locked}>Login</button>

        {error && <p className="auth-error">{error}</p>}
      </form>
    </div>
  );
}
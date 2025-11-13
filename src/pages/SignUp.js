import React, { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

    if (!validEmail(email)) {
      return setError("Invalid email format.");
    }

    if (!validPassword(pw)) {
      return setError(
        "Password must be 8+ characters, include a capital letter & special character."
      );
    }

    setSuccess("Account created successfully!");
    setError("");
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Sign Up</h1>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPw(e.target.value)}
        />

        <button>Create Account</button>

        {error && <p className="auth-error">{error}</p>}
        {success && <p className="auth-success">{success}</p>}
      </form>
    </div>
  );
}
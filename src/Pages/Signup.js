import { useState } from "react";
import "./Login.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("✅ Signup button clicked");

    // simple validation
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    console.log("Name:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Signup successful! You can now log in.");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(`❌ Signup failed: ${data.message || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error:", err);
      setMessage("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <h2>Sign Up</h2>

      <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Name"
            className="login-input"
            value={username}
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>

      {/* ✅ Display success or error message */}
      {message && (
        <p
          style={{
            color: message.startsWith("✅") ? "green" : "red",
            marginTop: "10px",
          }}
        >
          {message}
        </p>
      )}

      <div className="login-options">
        <p className="signup-text">
          Already have an account?{" "}
          <a href="/login" className="signup-link">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

import { useState } from "react";
import "./Login.css";

function Signup() {
  // email is the value of the email input field(notebook)
  // set email is the function to update the email state(pen)
  const [email, setEmail] = useState(""); // usestate like memory
  const [password, setPassword] = useState("");
  const [confirmPassword, setcofirmPassword] = useState("");
  const [username, setName] = useState("");
  const [error, setError] = useState({}); // object
  const [message, setMessage] = useState(""); // string

  const handleSubmit = async (e) => { // async is await
    e.preventDefault(); // prevent reloading
    

    console.log("Name:", username);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    
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
          Already have an account? <a href="/login" className="signup-link">Login</a>
        </p>
      </div>

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Signup;

import React from "react";
import "./Login.css";

function Signup() {
  return (
    <div className="login-container">
      <h2>Sign Up</h2>

      <form>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Name"
            className="login-input"
            required
            minLength={3} // Minimum 3 characters
          />
         
        </div>

        <div className="input-wrapper">
          <input
            type="email"
            placeholder="Email"
            className="login-input"
            required
          />
      
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Password (min 6 chars)"
            className="login-input"
            required
            minLength={6}
          />
         
        </div>

        <div className="input-wrapper">
          <input
            type="password"
            placeholder="Confirm Password"
            className="login-input"
            required
            minLength={6}
          />
        
        </div>

        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>

      <div className="login-options">
        <p className="signup-text">
          Already have an account? <a href="/login" className="signup-link">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

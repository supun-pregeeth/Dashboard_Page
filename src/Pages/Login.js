import React from "react";
import "./Login.css";

function Login() {

  const handleLogin = (e) => {
    e.preventDefault();
    
  }



  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <input 
        type="email" 
        placeholder="Email" 
        className="login-input"
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="login-input"
      />

      <button className="login-button">Login</button>

      <div className="login-options">
        <a href="/forgot-password" className="login-link">Forgot Password?</a>
        <p className="signup-text">
          Don't have an account? <a href="/signup" className="signup-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;


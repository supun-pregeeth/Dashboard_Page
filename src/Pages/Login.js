import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = (e) => {

    e.preventDefault();

    if(email ==="admin@gmail.com" && password ==="123456"){
      localStorage.setItem("admin", true);
      navigate("/admin");

    }else{
      alert("Invalid credentials");
    }

    console.log("Login attempted with", email, password);
    
  }



  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <input 
        type="email" 
        placeholder="Email" 
        className="login-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        placeholder="Password" 
        className="login-input"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button className="login-button" onClick={handleLogin}>Login</button>

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


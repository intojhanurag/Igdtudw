// filepath: /c:/Users/aojha/OneDrive/Desktop/Cohort 3.0 Web Dev/Iddtuw/frontend/src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import Alert from './Alert'
import LoadingSpinner from './LoadingSpinner';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [error,setError]=useState(null);
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // Handle login logic here
    try {
      const response = await fetch('https://igdtudw.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        localStorage.setItem('token', data.token); // Store the token in local storage
        localStorage.setItem('username', username); // Store the username in local storage
      
        navigate('/userinput')
        // Store the token in local storage or state
      } else {
        const data=await response.json();
        setError(data.message||'Failed to login . Try agin later')
      } 
    } catch (error) {
        setError('Error logging in. Please try again.');
      } finally {
        setIsLoading(false);
      }
      
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleCloseAlert=()=>{
    setError(null);
  }

  return (
    <div className="login-container">
      {isLoading ? (
        <LoadingSpinner/>
      ) : (

      
        <div className="login-card">
          {error && <Alert message={error} onClose={handleCloseAlert}/>}
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="password-container">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                onClick={togglePasswordVisibility}
                className="password-toggle-icon"
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="signup-link">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
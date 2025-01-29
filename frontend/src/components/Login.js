import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const navigate = useNavigate(); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    axios.post('http://localhost:5000/login', { email, password })
      .then((response) => {
        setMessage(response.data.message);
        setMessageType('success');
        setTimeout(() => {
          setMessage('');
          navigate('/dashboard');
        }, 3000);
      })
      .catch((error) => {
        setMessage(error.response?.data.message || 'An error occurred.');
        setMessageType('danger');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      {message && (
        <div className={`alert alert-${messageType} position-fixed top-0 end-0 mt-3 me-3`}>
          {message}
        </div>
      )}

      <div className="bg-light p-4 rounded">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

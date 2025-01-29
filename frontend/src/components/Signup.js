import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    axios.post('http://localhost:5000/signup', { username, email, password })
      .then((response) => {
        setMessage(response.data.message);
        setMessageType('success');
        setTimeout(() => setMessage(''), 3000);
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
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
          <button type="submit" className="btn btn-success w-100">Sign Up</button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

import { useState, useRef } from 'react';
import './Login.css'
import { useNavigate } from 'react-router-dom';


function Register() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, username, password);

    const data = {
      email, password, username
    }

    console.log(data);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (response.ok) {
        navigate('/games');
        console.log(email, username, password);
      } else {
        const errorData = await response.json();
        setError(errorData.message);
        console.log(email, username, password);
      }
    } catch (error) {
      setError('An error occurred during login. Please try again later.');
      console.log(email, username, password);
    }
  }

  

  return (
    <div className="reg-container">
      <div className='register'>
        <h1>Create user</h1>
        <h2>Register</h2>
        <form className='form_auth' onSubmit={handleSubmit} action='/'>

          <input
            placeholder='username'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            placeholder='email'
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            placeholder='password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            placeholder='confirm password'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
          <button type="submit" >create user</button>
        </form>
      </div>
    </div>
  )
}

export default Register
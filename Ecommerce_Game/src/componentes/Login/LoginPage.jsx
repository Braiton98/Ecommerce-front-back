import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function LoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    }

    console.log(data);

    try {
      const response = await fetch('http://localhost:3008/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify( data ),
      });

      if (response.ok) {
        navigate('/games');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <>
    <div className="body-login">
      <div className="body-image"></div>
      <div className="log-container">
        <div className="login">
          <h2>Login</h2>
          <form className="form_auth" onSubmit={handleSubmit} action='/'>
            <input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="" >
              Login
            </button>
          </form>
          {error && <p className="error-message">{error}</p>}
          <p>
            Do you not have an account yet?
            <a href="/register"> Sign up</a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}

export default LoginPage;
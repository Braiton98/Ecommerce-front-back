import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext/AuthContext';
import './Login.css';

function LoginPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const { loginSuccess } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password
    }

    console.log(data);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify( data ),
      });

      if (response.ok) {
        loginSuccess();
        navigate('/games');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError('Ha ocurrido un error, por favor intente nuevamente más tarde.');
    }
  };

  return (
    <>
    <div className="body-login">
      <div className="body-image"></div>
      <div className="log-container">
        <div className="login">
          <h2>Login</h2>
          <form className="form_auth" onSubmit={handleSubmit}>
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
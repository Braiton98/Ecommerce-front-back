import { useState } from 'react';
import './Login.css'


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="reg-container">
      <div className='register'>
        <h1>Create user</h1>
        <h2>Register</h2>
        <form className='form_auth' onSubmit={handleSubmit}>

          <input
            placeholder='name'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          <button onClick={() => window.location.href = "/games"}>create user</button>
        </form>
      </div>
    </div>
  )
}

export default Register
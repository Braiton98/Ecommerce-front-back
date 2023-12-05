import { useState} from 'react' 
import './Login.css' 

function LoginPage () {
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const handleSubmit = (e) => {
        e.preventDefault()
   }

    return (
        <div className='login'>
        <h2>Login</h2>
        <form className='form_auth' onSubmit={handleSubmit}>
            <input
                placeholder='email'
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input 
                type="password" 
                placeholder='password' 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
            />
            <button onClick={() => window.location.href="/games"}>Login</button>
        </form>
        <p> Do you not have an accout yet?<a href="/register"> Sign up</a></p>
        </div>
    )
}


export default LoginPage;
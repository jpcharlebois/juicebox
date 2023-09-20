import { useState } from 'react'
import { login } from '../api/ajaxHelper';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom/dist';

export default function LoginForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleLogin(event) {
        event.preventDefault();
        console.log("Hello 👋");

        try {
            let token = await login(username, password);
            setToken(token);
            window.sessionStorage.setItem("token", token);
            navigate(`/`);
        } catch (error) {
            setError(error);
        }
      }

    return (
    <> 
      <div className='sign-in'>
        <h2>Sign In!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleLogin}>
            <label>
                Username: 
                    <input 
                        type='text' 
                        required={true} 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} />
            </label>
            <label>
                Password: 
                    <input 
                        type='password' 
                        required={true} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button>LOG IN</button>
        </form>
        <p>Don't have an account?</p><Link to={`/account/register`}> Sign Up!</Link>
      </div>
    </>
    )
}
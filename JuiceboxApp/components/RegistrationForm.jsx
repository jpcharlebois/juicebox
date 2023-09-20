import { useState } from 'react'
import { registerUser } from '../api/ajaxHelper'
import { useNavigate } from 'react-router-dom'

export default function RegistrationForm({ setToken }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("Hello 👋");
        if (password !== confirmPassword) {
            setError({message: "Passwords dont match"});
            return;
        }

        try {
            const userObj = {
              username: username,
              password: password,
              name: name,
              location: location
            }

            let token = await registerUser(userObj);
            setToken(token);
        } catch (error) {
            setError(error);
        }
        navigate('/');
      }

    return (
    <> 
      <div className='sign-up'>
        <h2>Sign Up!</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
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
                        minLength={8} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} />
            </label>
            <label>
                Confirm Password: 
                    <input 
                        type='password' 
                        required={true} 
                        minLength={8} 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} />
            </label>
            <label>
                Name: 
                    <input 
                        type='text' 
                        required={true} 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Location: 
                    <input 
                        type='text' 
                        required={true} 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} />
            </label>
            <button>Submit</button>
        </form>
      </div>
    </>
    )
}
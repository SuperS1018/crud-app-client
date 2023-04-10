import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputs(prev => ({ ...prev, [e?.target?.name]: e?.target?.value }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        try {
            await axios.post('/api/auth/register', inputs);
            navigate('/login');
        } catch (err: any) {
            setError(err.response.data);
        }
    }
    return (
        <div className="auth">
            <h1>Signup</h1>
            <form>
                <input type="text" placeholder="username" name='username' onChange={handleChange} required />
                <input type="email" placeholder="email" name='email' onChange={handleChange} required />
                <input type="password" placeholder="password" name='password' onChange={handleChange} required />
                <button onClick={handleSubmit}>Signup</button>
                {error && <p className="error">{error}</p>}
                <span>Do you have an account? <Link to='/login'>Login</Link></span> 
            </form>
        </div>
    );
};

export default Signup;
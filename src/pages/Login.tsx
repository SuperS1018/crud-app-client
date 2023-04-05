import React, { Context, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextProps } from "../context/authContext";

export interface inputsProps {
    username: string;
    password: string;
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState<inputsProps>({ username: '', password: '' });
    const [error, setError] = useState<string>();

    const { login } = useContext<AuthContextProps>(AuthContext as Context<AuthContextProps>);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputs(prev => ({ ...prev, [e?.target?.name]: e?.target?.value }));
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        try {
            await login(inputs);
            navigate('/');
        } catch (err: any) {
            setError(err.response.data);
        }
    }
    return (
        <div className="auth">
            <h1>Login</h1>
            <form action="http://localhost:8080/api/users/register" method='POST'>
                <input type="text" placeholder="username" name='username' onChange={handleChange} required />
                <input type="password" placeholder="password" name='password' onChange={handleChange} required />
                <button onClick={handleSubmit}>Login</button>
                {error && <p className="error">{error}</p>}
                <span>Don't you have an account? <Link to='/signup'>Register</Link></span> 
            </form>
        </div>
    );
};

export default Login;
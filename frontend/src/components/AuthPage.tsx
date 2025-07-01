import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';

const AuthPage: React.FC = () => {
    const [isLogin,setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/signup';
            const data = isLogin ? { username, password } : { username, email, password };
            const response = await axios.post(endpoint, data);
            alert(isLogin ? 'Login successful!' : 'Signup successful!');
            if(isLogin) {
                // Redirect to dashboard or home page after login
                if(response.data.message === 'Profile incomplete') {
                    navigate('/userprofile');
                } else {
                    navigate('/progressdashboard');
                }
            }
        } catch (error) {
            console.error('Error during authentication:', error);
            alert('Authentication failed. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h1>Welcome to Fit Track</h1>
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                {!isLogin && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
                <p>
                    {isLogin? "Don't have an account?" : "Already have an account?"}
                    <Link to="#" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? ' Signup' : ' Login'}
                    </Link>
                </p>
            </form>
        </div>
    );
};
export default AuthPage;
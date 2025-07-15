import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { useAuth } from '../context/AuthContext';


const AuthPage: React.FC = () => {
   const{ setUser } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const endpoint = isLogin
                ? 'http://localhost:5000/api/users/login'
                : 'http://localhost:5000/api/users/signup';

            const data = isLogin
                ? { username, password }
                : { username, email, password };

            const response = await axios.post(endpoint, data);

            console.log('Login response:', response.data);

            if (isLogin) {
                const { token, user } = response.data;

                if (token && user) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('user', JSON.stringify(user));
                    // If you use AuthContext, update it here:
                   setUser(user);

                    // Redirect based on profile completion
                    if (user.profileCompleted) {
                        alert('Login successful!');
                        navigate('/progressdashboard');
                    } else {
                        alert('Please complete your profile first.');
                        navigate('/userprofile');
                    }
                } else {
                    alert('Login failed: Token or user not received.');
                }
            } else {
                alert('Signup successful! Please log in.');
                setIsLogin(true); // Switch to login after signup
            }
        } catch (error: any) {
            console.error('Authentication error:', error);
            alert(
                error?.response?.data?.error ||
                'Authentication failed. Please try again.'
            );
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
                    autoComplete="username"
                />
                {!isLogin && (
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                )}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete={isLogin ? "current-password" : "new-password"}
                />
                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
                <p>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <Link to="#" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? ' Signup' : ' Login'}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default AuthPage;
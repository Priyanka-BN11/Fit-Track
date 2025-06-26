import React, { useState } from 'react';
import axios from 'axios';

const UserProfile: React.FC = () => {
    const [username, setUsername] = useState('');
    const [goals, setGoals] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Submit user data to the backend
        await axios.post('/api/users', { username, goals });
        // Handle response (e.g., show success message)
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Fitness Goals"
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
            />
            <button type="submit">Save Profile</button>
        </form>
    );
};

export default UserProfile;
import React, { useState } from 'react';
import axios from 'axios';

const UserProfile: React.FC = () => {
    const [username, setUsername] = useState('');
    const [goals, setGoals] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
         try {
            await axios.post('http://localhost:5000/api/users', { username, goals });
            setSuccess(true); // Show success message
            setUsername('');
            setGoals('');
        } catch (error) {
            setSuccess(false);
            // Optionally handle error
        }
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
              {success && <p style={{ color: 'green' }}>Profile saved successfully!</p>}
        </form>
    );
};

export default UserProfile;
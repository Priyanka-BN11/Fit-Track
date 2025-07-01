import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const UserProfile: React.FC<{ user: any }> = ({ user }) => {
    const [goals, setGoals] = useState(user.goals);
    const history = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/users/${user._id}/profile`, { goals });
            alert('Profile updated successfully!');
            history('/progressdashboard'); // Redirect to dashboard after saving profile
        } catch (error) {
            console.error('Error saving profile:', error);
            alert('Failed to save profile. Please try again.');
            // Optionally handle error
        }
    };

    return (
        <div>
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your Fitness Goals"
                    value={goals}
                    onChange={(e) => setGoals(e.target.value)}
                    required
                />
                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
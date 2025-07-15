import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const UserProfile: React.FC=() => {
    const { user } = useAuth();
    const [fullname, setFullname] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('boolean');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [goals, setGoals] = useState('');
    // const history = useNavigate();
    const navigate = useNavigate();

    useEffect(() => {
    if (!user || !user._id) {
      console.log("User is not logged in or no user data available");
      navigate('/');
      
    }
   
  }, [user, navigate]);

    useEffect(() => {
    if (user?.goals) {
      setGoals(user.goals);
    }
        }, [user]);
    useEffect(() => {
      if (user) {
        setFullname(user.fullname || '');
        setAge(user.age?.toString() || '');
        setHeight(user.height?.toString() || '');
        setWeight(user.weight?.toString() || '');
        setGender(user.gender || '');
      }
    }, [user]);

      
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/users/${user?._id}/profile`, { goals });
            alert('Profile updated successfully!');
            navigate('/logactivity'); // Redirect to progress dashboard after saving changes
        } catch (error:any) {
            console.error('Error saving profile:', error.response?.data || error.message);
            alert('Failed to save profile. Please try again.');
            // Optionally handle error
        }
    };
    // ✅ Only show form if user is authenticated
  if (!user || !user._id) {
    return <div className="text-red-500">Error: User not logged in.</div>;
  }
if (user === undefined) {
  return <div>Loading...</div>; // or a spinner
}

    return (
        <div>
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                   <input
                    type="text"
                    placeholder="Age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                   <select
                    
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                >
                  <option value="" >Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                
                </select>
                   <input
                    type="text"
                    placeholder="Height(cm)"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                   <input
                    type="text"
                    placeholder="Weight(kg)"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                />
                <select 
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded"
                >
              <option value="">Select your goal</option>
              <option value="weight_loss">Weight Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="endurance">Endurance</option>
              <option value="general_fitness">General Fitness</option>
              </select>
                <button type="submit">Save Profile</button>
            </form>
        </div>
    );
};

export default UserProfile;
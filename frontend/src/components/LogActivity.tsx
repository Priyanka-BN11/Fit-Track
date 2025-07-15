import React, { useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';

const LogActivity: React.FC = () => {
  const { user } = useAuth();
  const [exercise, setExercise] = useState('');
  const [duration, setDuration] = useState('');
  const [calories, setCalories] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     if (!user) {
  alert('User not logged in.');
  return;
}

await axios.post('/activities', {
  userId: user._id,
  exercise,
  duration,
  calories,
});
     
      alert('Activity logged!');
      setExercise('');
      setDuration('');
      setCalories('');
    } catch (err) {
      console.error(err);
      alert('Failed to log activity.');
    }
  };

  return (
    <div>
      <h2>Log New Activity</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} />
        <input type="number" placeholder="Duration (min)" value={duration} onChange={(e) => setDuration(e.target.value)} />
        <input type="number" placeholder="Calories Burned" value={calories} onChange={(e) => setCalories(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogActivity;

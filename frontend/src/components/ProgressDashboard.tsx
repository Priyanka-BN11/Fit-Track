import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const ProgressDashboard = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
       if (!user) return;

  const res = await axios.get(`/users/${user._id}/profile`);

        setGoals(res.data.goals);
      } catch (err) {
        console.error('Error fetching goals:', err);
      } finally {
        setLoading(false);
      }
    };
console.log('ProgressDashboard mounted');
    //if (user?._id) fetchGoals();
  }, [user]);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Calories Burned',
        data: [500, 700, 300, 900, 650],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59,130,246,0.5)',
      },
    ],
  };
if (!user) {
    return <p className="text-center text-gray-600">Loading user data...</p>;
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome Back, {user?.name || 'User'}!</h1>

      {!loading && (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">Your Fitness Goal</h2>
          <p>{goals || 'No goal set yet.'}</p>
        </div>
      )}

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-2">Calories Burned</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ProgressDashboard;

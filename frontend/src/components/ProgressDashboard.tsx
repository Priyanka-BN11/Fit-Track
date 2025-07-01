
import { Line } from 'react-chartjs-2';
import { Chart, registerables, CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, } from 'chart.js';

// Register everything
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ...registerables);

const ProgressDashboard= () => {
  const data = {
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

   return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <Line data={data} />
      </div>
    </div>
  );
};


export default ProgressDashboard;
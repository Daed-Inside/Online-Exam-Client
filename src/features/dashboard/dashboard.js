import "./dashboard.css";
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => {
            return 1000;
        }),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => {
            return 1000;
        }),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

function Dashboard() {

    return <div className="dashboard_layout">
        <div className="dashboard_numbers">
            <div className="dashboard_number">
                <span className="dashboard_number_header">Total number:</span>
                <span className="dashboard_number_content">10</span>
            </div>
            <div className="dashboard_number">
                <span className="dashboard_number_header">Total number:</span>
                <span className="dashboard_number_content">20000</span>
            </div>
            <div className="dashboard_number">
                <span className="dashboard_number_header">Total number:</span>
                <span className="dashboard_number_content">3000</span>
            </div>
        </div>
        <div className="dashboard_chart">
            <Bar options={options} data={data} />
        </div>
    </div>
}

export default Dashboard;
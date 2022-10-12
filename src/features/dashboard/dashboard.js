import "./dashboard.css";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

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
      position: "top",
    },
    title: {
      display: true,
      text: "Result Overview",
    },
  },
};

const labels = [
  "Math",
  "Physic",
  "Biology",
  "Chemistry",
  "Geography",
  "History",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Average Score",
      data: labels.map(() => {
        return 1000;
      }),
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 159, 64, 0.5)",
        "rgba(255, 205, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(153, 102, 255, 0.5)",
      ],
      borderWidth: 1,
    },
  ],
};

function Dashboard() {
  return (
    <div className="dashboard_layout">
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
  );
}

export default Dashboard;

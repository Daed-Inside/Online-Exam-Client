import "./dashboard.css";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { handleApi } from "../../components/utils/utils";
import constant from "../../constants/constant";
import jwt_decode from "jwt-decode";

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

function fetchDashboard(setDashboardData, setChartData) {
  axios
    .get(`${constant.BASEURL}/core/dashboard`, {
      headers: {
        Authorization:
          "Bearer " + localStorage.getItem(constant.localStorage.TOKEN),
      },
    })
    .then((res) => {
      handleApi(res, (e) => {
        setDashboardData({
          first_block: res.data.data.first_block,
          second_block: res.data.data.second_block,
          third_block: res.data.data.third_block,
        });
        let newDataset = [
          {
            label: res.data.data.chart_name,
            data: res.data.data.data,
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
        ];
        setChartData({
          labels: res.data.data.labels,
          datasets: newDataset,
        });
      });
    })
    .catch((error) => {
      console.log(error);
      setTimeout(() => {
        alert(error);
      }, 400);
    });
}

function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    first_block: 0,
    second_block: 0,
    third_block: 0,
  });
  const [permission, setPermission] = React.useState(-1);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Average Score",
        data: [],
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
  });

  useEffect(() => {
    const token = localStorage.getItem(constant.localStorage.TOKEN);
    if (token != null && token.length > 0) {
      const decoded = jwt_decode(token);
      setPermission(parseInt(decoded.role));
    }
    fetchDashboard(setDashboardData, setChartData);
  }, []);

  return (
    <div className="dashboard_layout">
      <div className="dashboard_numbers">
        <div className="dashboard_number">
          <span className="dashboard_number_header">
            {permission === 1 ? "Waiting Test" : "Number of Classes"}
          </span>
          <span className="dashboard_number_content blacked-test">
            {dashboardData.first_block}
          </span>
        </div>
        <div className="dashboard_number">
          <span className="dashboard_number_header">
            {permission === 1 ? "Expired Test" : "Total Result"}
          </span>
          <span className="dashboard_number_content blacked-test">
            {dashboardData.second_block}
          </span>
        </div>
        <div className="dashboard_number">
          <span className="dashboard_number_header">
            {permission === 1 ? "Completed Test" : "Total Question"}
          </span>
          <span className="dashboard_number_content blacked-test">
            {dashboardData.third_block}
          </span>
        </div>
      </div>
      <div className="dashboard_chart">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
}

export default Dashboard;

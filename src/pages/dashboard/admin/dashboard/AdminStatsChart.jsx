/* eslint-disable react/prop-types */
import { Pie, Line } from "react-chartjs-2";
import "chart.js/auto";

const AdminStatsChart = ({ stats }) => {
  console.log(stats);
  const pieData = {
    labels: ["Total Orders", "Total Products", "Total Reviews", "Total Users"],
    datasets: [
      {
        label: "Admin Stats",
        data: [
          // stats.monthlyEarnings,
          // stats.totalEarnings.toFixed(2),
          stats?.totalOrders,
          stats?.totalProducts,
          stats?.totalReviews,
          stats?.totalUsers,
        ],
        backgroundColor: [
          "rgb(54, 162, 235)",
          "rgb(255, 99, 132)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
        ],
        hoverBackgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(255, 205, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(54, 162, 235, 0.5)",
        ],
      },
    ],
  };
  const data = new Array(12).fill(0);
  // map correct months
  stats?.monthlyEarnings.forEach((entry) => {
    data[entry.month - 1] = entry.earnings;
  });

  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Earnings",
        data,
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="mt-12 space-y-12">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Admin Stats Overview
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="max-h-96 md:h-96 w-full">
          <Pie data={pieData} options={options} />
        </div>

        {/* Line Chart */}
        <div className="max-h-96 md:h-96 w-full">
          <Line data={lineData} options={options} />
        </div>
      </div>
      <div>
        <p className="text-center">Made by Shotech Enterprises</p>
      </div>
    </div>
  );
};

export default AdminStatsChart;

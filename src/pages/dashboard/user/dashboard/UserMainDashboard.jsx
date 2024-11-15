import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js/auto";
import UserStats from "../../admin/dashboard/UserStats";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const UserMainDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);
  // console.log("Stats data:", stats); // Confirm structure

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) {
    return <div className="text-center text-red-500">No data found</div>;
  }

  const data = {
    labels: ["Total Payments", "Total Reviews", "Total Products Purchased"],
    datasets: [
      {
        label: "User Stats",
        data: [
          stats.totalPaymentAmount,
          stats.totalReviews * 50,
          stats.totalProductsPurchased * 50,
        ],
        backgroundColor: "rgb(54, 267, 235)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            if (tooltipItem.label === "Total Payments") {
              return `Total Payments: $${tooltipItem.raw.toFixed(2)}`;
            }
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="p-6">
      <div>
        <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
        <p className="text-gray-500">
          Hi, {user?.username} Welcome to your dashboard
        </p>
      </div>
      <UserStats stats={stats} />
      <div className="mb-6"><Bar data={data} options={options}/> </div>
    </div>
  );
};

export default UserMainDashboard;

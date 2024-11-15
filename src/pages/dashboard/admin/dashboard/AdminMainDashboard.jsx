import { useSelector } from "react-redux"
import {useGetAdminStatsQuery} from "../../../../redux/features/stats/statsApi"
import AdminStats from "./AdminStats";
import AdminStatsChart from "./AdminStatsChart";

const AdminMainDashboard = () => {
  const {user} = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();

  if (isLoading) return <div className="text-center">Loading...</div>
  if (!stats) return <div className="">No Stats Found</div>
  if(error) return <div className="">Failed to load stats</div>

  return (
    <div>
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
        <p className="text-blue-500">
          Hi,{" "}
          <span className="text-blue-800 font-semibold">{user?.username}</span>{" "}
          Welcome to your dashboard
        </p>
      </div>
      <AdminStats stats={stats} />
      <AdminStatsChart stats={stats} />
    </div>
  );
}

export default AdminMainDashboard

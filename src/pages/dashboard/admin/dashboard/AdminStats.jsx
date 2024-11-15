import PropTypes from "prop-types";

const AdminStats = ({ stats }) => {
  console.log(stats);
  return (
    <div className="my-5 space-x-4">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        <div className="bg-white shadow-md rounded-lg p-6 border border-blue-800 hover:scale-105 transition-all duration-200 cursor-pointer">
          <h2 className="text-2xl font-semibold mb-2">Total Earnings</h2>
          <p className="text-2xl text-blue-700 font-semibold">
            ${stats?.totalEarnings}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-blue-800 hover:scale-105 transition-all duration-200 cursor-pointer">
          <h2 className="text-2xl font-semibold mb-2">Total Orders</h2>
          <p className="text-2xl text-blue-700 font-semibold">
            {stats?.totalOrders}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-blue-800 hover:scale-105 transition-all duration-200 cursor-pointer">
          <h2 className="text-2xl font-semibold mb-2">Total Users</h2>
          <p className="text-2xl text-blue-700 font-semibold">
            {stats?.totalUsers}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-blue-800 hover:scale-105 transition-all duration-200 cursor-pointer">
          <h2 className="text-2xl font-semibold mb-2">Total Products</h2>
          <p className="text-2xl text-blue-700 font-semibold">
            {stats?.totalProducts}
          </p>
        </div>
      </div>
    </div>
  );
};

AdminStats.propTypes = {
  stats: PropTypes.shape({
    totalEarnings: PropTypes.number,
    totalOrders: PropTypes.number,
    totalUsers: PropTypes.number,
    totalProducts: PropTypes.number,
  }).isRequired,
};

export default AdminStats;

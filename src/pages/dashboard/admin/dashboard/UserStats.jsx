import PropTypes from "prop-types";

const UserStats = ({ stats }) => {
  return (
    <div className="space-y-5 my-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
        <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200">
          <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
          <p className="text-2xl font-bold">
            ${stats?.totalPaymentAmount.toFixed(2)}
          </p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200">
          <h2 className="text-xl font-semibold mb-2">Total Reviews</h2>
          <p className="text-2xl font-bold">{stats?.totalReviews}</p>
        </div>
        <div className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:border-primary cursor-pointer hover:scale-105 transition-all duration-200">
          <h2 className="text-xl font-semibold mb-2">
            Total Products Purchased
          </h2>
          <p className="text-2xl font-bold">{stats?.totalProductsPurchased}</p>
        </div>
      </div>
    </div>
  );
};

UserStats.propTypes = {
  stats: PropTypes.shape({
    totalPaymentAmount: PropTypes.number,
    totalReviews: PropTypes.number,
    totalProductsPurchased: PropTypes.number
  }).isRequired,
};

export default UserStats;

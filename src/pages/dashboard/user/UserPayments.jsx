import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/order/orderApi";

const UserPayments = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: ordersData,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500">No orders found</div>;

  const orders = ordersData?.orders || [];
  const totalPayment = orders
    ?.reduce((acc, order) => acc + order.amount, 0)
    .toFixed(2);

  return (
    <div className="py-6 px-4">
      <h2 className="text-2xl font-semibold text-gray-800">My Payments</h2>
      <div>
        <p className="text-lg font-medium text-gray-600 mb-5">Total Spent: ${totalPayment}</p>
        <ul>
          {orders &&
            orders.map((item, index) => (
              <li className="mt-4 border border-gray-800 rounded-lg p-4" key={index}>
                <h5 className="font-medium text-gray-500 mb-2">
                  Order #{index + 1}
                </h5>
                <div>
                  <span className="text-gray-800">
                    Amount: <span className="text-purple-600">${item?.amount.toFixed(2)}</span>
                  </span>
                </div>
                <div>
                  Date: <span className="text-gray-600">{new Date(item?.createdAt).toDateString()}</span>
                  <p className="text-gray-600">
                    Status: <span className={`ml-2 py-[2px] px-2 text-sm rounded ${
                      item?.status === "completed"
                        ? "bg-green-100 text-green-500"
                        : item?.status === "pending"
                        ? "bg-yellow-100 text-yellow-500"
                        : item?.status === "processing"
                        ? "bg-red-100 text-red-500"
                        : "bg-blue-100 text-blue-500"
                    } `}>{item?.status}</span>
                  
                    
                  </p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserPayments;
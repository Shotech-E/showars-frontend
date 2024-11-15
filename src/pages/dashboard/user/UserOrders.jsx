import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/order/orderApi";
import { Link } from "react-router-dom";

const UserOrders = () => {
  const { user } = useSelector((state) => state.auth);
  const {data: order, error, isLoading} = useGetOrdersByEmailQuery(user?.email);
  const orders = order?.orders;

  if (isLoading) return <div className="text-center">Loading...</div>;
  if(error) return <div className="text-center text-red-500">No order found</div>
  return (
    <section className="py-1 bg-blueGray-50">
      <div className="w-full mb-12 xl:mb-0 px-4 mx-auto">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">
                  My Order
                </h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <button
                  className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    #
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Order ID
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Status
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Total
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    View Order
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders &&
                  orders.map((order, index) => (
                    <tr key={index}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {index + 1}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {order?.orderId}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {new Date(order?.createdAt).toDateString()}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        <span className={`p-1 rounded ${order?.status === "completed" ? "bg-green-100 text-green-700" : order?.status === "pending" ? "bg-yellow-100 text-yellow-700" : order?.status === "processing" ? "bg-red-100 text-red-700" : "bg-blue-100 text-blue-700"}`}>{order?.status}</span>
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        {order?.amount}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                        <Link to={`/order/${order?._id}`} className="text-indigo-600 hover:text-indigo-900"><i className="ri-eye-line"></i></Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* <footer className="relative pt-8 pb-6 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Made with{" "}
                <a
                  href="https://www.creative-tim.com/product/notus-js"
                  className="text-blueGray-500 hover:text-gray-800"
                  target="_blank"
                >
                  Notus JS
                </a>{" "}
                by{" "}
                <a
                  href="https://www.creative-tim.com"
                  className="text-blueGray-500 hover:text-blueGray-800"
                  target="_blank"
                >
                  {" "}
                  Creative Tim
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </footer> */}
    </section>
  );
};

export default UserOrders;

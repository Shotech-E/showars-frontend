import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../../../utils/formateDate";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/features/order/orderApi";
import UpdateOrderModal from "./UpdateOrderModal";

const ManageOrders = () => {
	const { data: orders, error, isLoading, refetch } = useGetAllOrdersQuery()
	const [selectedOrder, setSelectedOrder] = useState(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [deleteOrder] = useDeleteOrderMutation()

	const handleEditOrder = (order) => {
		setSelectedOrder(order)
		setIsModalOpen(true)
	}

	const handleCloseModal = () => {
		setIsModalOpen(false)
		setSelectedOrder(null)
	}

	const handleDeleteOder = async (orderId) => {
		try {
			await deleteOrder(orderId).unwrap()
			alert('Order deleted successfully')
			refetch()
		} catch (error) {
			console.error('Failed to delete order:', error)
		}
	}

	if (isLoading) return <div>Loading....</div>
	if (error) return <div>Something went wrong!</div>

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading users data.</div>}
      <section className="py-1 bg-blueGray-50">
        <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Manage Orders
                  </h3>
                </div>
{/*                 <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div> */}
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      No.
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Order Id
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Customer Email
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {" "}
                      Actions{" "}
                    </th>{" "}
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
                          <img
                            className="w-full h-full rounded-full"
                            src={order.image}
                            alt=""
                          />{" "}
                          {order?.orderId}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {order?.email}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <span
                            className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(
                              order?.status
                            )}`}
                          >
                            {order?.status}
                          </span>
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {formatDate(order?.updatedAt)}
                        </td>
                        <td className="border-b-0 border-gray-200 bg-white text-sm">
                          <Link
                            to="#"
                            className="text-blue-500 hover:underline"
                          >
                            <i className="ri-eye-line p-2 text-yellow-500 hover:text-yellow-900"></i>
                          </Link>
                          <button
                            className="text-green-500 hover:underline"
                            onClick={() => handleEditOrder(order)}
                          >
                            <i className="ri-edit-box-line p-2 text-green-500 hover:text-green-900"></i>
                          </button>
                          <button
                            className="text-red-500 hover:underline"
                            onClick={() => handleDeleteOder(order?._id)}
                          >
                            <i className="ri-delete-bin-2-line p-2 text-red-500 hover:text-red-900"></i>
                          </button>
                        </td>{" "}
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <footer className="relative pt-8 pb-6 mt-16">
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
                    Shotech Enterprises
                  </a>{" "}
                  by{" "}
                  <a
                    href="https://www.creative-tim.com"
                    className="text-blueGray-500 hover:text-blueGray-800"
                    target="_blank"
                  >
                    {" "}
                    Shotech
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
      {/* update order modal */}
      {selectedOrder && (
        <UpdateOrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

const getStatusColor = (status) => {
	switch (status) {
		case 'pending':
			return 'bg-yellow-500'
		case 'processing':
			return 'bg-red-400'
		case 'shipped':
			return 'bg-green-300'
		case 'completed':
			return 'bg-green-700'
		default:
			return 'bg-green-700'
	}
}

export default ManageOrders

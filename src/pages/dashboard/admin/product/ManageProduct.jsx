import {
  useFetchAllProductsQuery,
  useDeleteProductMutation,
} from "../../../../redux/features/products/productsApi";
import { useState } from "react";
import { formatDate } from "../../../../utils/formateDate";
import { Link } from "react-router-dom";

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
    refetch,
  } = useFetchAllProductsQuery({
    page: currentPage,
    limit: productsPerPage,
    category: "",
    colour: "",
    minPrice: "",
    maxPrice: "",
  });

  // Pagination
  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;
  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const [deleteProduct] = useDeleteProductMutation();
  const handleDeleteProduct = async (id) => {
    try {
      const response = await deleteProduct(id).unwrap();
      alert("Product deleted successfully");
      await refetch(response);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      {isLoading && <div className="text-center">Loading...</div>}{" "}
      {error && (
        <div className="text-center text-red-500">Error fetching products.</div>
      )}{" "}
      {!isLoading && !error && (
        <div className="bg-white p-8 rounded-md w-full">
          {" "}
          <div className="flex items-center justify-between pb-6">
            {" "}
            <div>
              {" "}
              <h2 className="text-gray-600 font-semibold">All Products</h2>{" "}
              <span className="text-xs xs:text-sm text-gray-900">
                {" "}
                Showing {startProduct} to {endProduct} of {totalProducts}{" "}
                Products{" "}
              </span>{" "}
            </div>{" "}
            <div className="flex items-center justify-between">
              {" "}
              <div className="flex bg-gray-50 items-center p-2 rounded-md">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />{" "}
                </svg>{" "}
                <input
                  className="bg-gray-50 outline-none ml-1 block"
                  type="text"
                  placeholder="search..."
                />{" "}
              </div>{" "}
              {/* <div className="lg:ml-40 ml-10 space-x-8">
                {" "}
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  {" "}
                  New Report{" "}
                </button>{" "}
                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                  {" "}
                  Create{" "}
                </button>{" "}
              </div>{" "} */}
            </div>{" "}
          </div>{" "}
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
            {" "}
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              {" "}
              <table className="min-w-full leading-normal">
                {" "}
                <thead>
                  {" "}
                  <tr>
                    {" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {" "}
                      Product Name{" "}
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {" "}
                      Publish Date{" "}
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {" "}
                      Category{" "}
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {" "}
                      Colour{" "}
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {" "}
                      Price{" "}
                    </th>{" "}
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      {" "}
                      Actions{" "}
                    </th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody>
                  {" "}
                  {products &&
                    products.map((product, index) => (
                      <tr key={index}>
                        {" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {" "}
                          <div className="flex items-center">
                            {" "}
                            <div className="flex-shrink-0 w-10 h-10">
                              {" "}
                              <img
                                className="w-full h-full rounded-full"
                                src={product.image}
                                alt=""
                              />{" "}
                            </div>{" "}
                            <div className="ml-3">
                              {" "}
                              <p className="text-gray-900 whitespace-no-wrap">
                                {" "}
                                {product.name}{" "}
                              </p>{" "}
                            </div>{" "}
                          </div>{" "}
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {" "}
                          <p className="text-gray-900 whitespace-no-wrap">
                            {" "}
                            {formatDate(product?.createdAt)}{" "}
                          </p>{" "}
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {" "}
                          <p className="text-gray-900 whitespace-no-wrap">
                            {" "}
                            {product?.category}{" "}
                          </p>{" "}
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {" "}
                          <p className="text-gray-900 whitespace-no-wrap">
                            {" "}
                            {product?.colour}{" "}
                          </p>{" "}
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {" "}
                          <p className="text-gray-900 whitespace-no-wrap">
                            {" "}
                            {product?.price}{" "}
                          </p>{" "}
                        </td>{" "}
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {" "}
                          <Link
                            to={`/dashboard/update-product/${product?._id}`}
                          >
                            <i className="ri-edit-box-line ml-2 text-green-500 hover:text-green-900"></i>
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="ml-2"
                          >
                            <i className="ri-delete-bin-2-line text-red-500 hover:text-red-900"></i>
                          </button>{" "}
                        </td>{" "}
                      </tr>
                    ))}{" "}
                </tbody>{" "}
              </table>{" "}
              <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
                {" "}
                <div className="inline-flex mt-2 xs:mt-0">
                  {" "}
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="text-sm text-indigo-700 transition duration-150 bg-indigo-300 font-semibold py-2 px-4 rounded mr-2"
                  >
                    {" "}
                    Prev{" "}
                  </button>{" "}
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                      className={`text-sm border transition duration-150 hover:bg-indigo-500 border-indigo-600 font-semibold py-2 px-4 ${
                        currentPage === index + 1
                          ? "bg-indigo-600 text-indigo-50"
                          : "bg-indigo-300 text-indigo-700"
                      } rounded-md mx-1 `}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="text-sm text-indigo-700 transition duration-150 bg-indigo-300 font-semibold py-2 px-4 rounded ml-2"
                  >
                    {" "}
                    Next{" "}
                  </button>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      )}
    </>
  );
};

export default ManageProduct;

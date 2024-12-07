import { useState, useEffect } from "react";
import ProductCards from "../shop/ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const filters = {
  categories: ["all", "accessories", "dress", "jewelry", "cosmetics"],
  colours: ["all", "black", "red", "gold", "blue", "green", "beige", "silver"],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: " $50 - $100", min: 50, max: 100 },
    { label: " $100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: "all",
    colour: "all",
    priceRange: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Just a number here
  const { category, colour, priceRange } = filtersState;
  const [minPrice, maxPrice] = priceRange
    ? priceRange.split("-").map(Number)
    : [NaN, NaN];

  const {
    data: { products = [], totalPages, totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: category !== "all" ? category : "",
    colour: colour !== "all" ? colour : "",
    minPrice: isNaN(minPrice) ? "" : minPrice,
    maxPrice: isNaN(maxPrice) ? "" : maxPrice,
    page: currentPage,
    limit: productsPerPage,
  });

  useEffect(() => {
    setCurrentPage(1); // Reset to first page whenever filters change
  }, [category, colour, priceRange]);

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      colour: "all",
      priceRange: "",
    });
  };

  // Handle pagination
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (error)
    return (
      <h1 className="text-center">Error loading products: {error.message}</h1>
    );

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas
          accusantium quod iure repellat, nemo numquam ex exercitationem, ullam
          id officiis accusamus minus facilis similique magnam architecto
        </p>
      </section>
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />
          <div>
            <h3 className="text-xl font-medium mb-4">
              Showing: {startProduct} to {endProduct} of {totalProducts}{" "}
              products
            </h3>
            <ProductCards products={products} />
            <div className="flex justify-center mt-8">
              <button
                className="btn btn-secondary px-4 py-2 mr-2 rounded-md"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1; // Calculate the page number
                return (
                  <button
                    key={index}
                    className={`btn-secondary px-4 py-2 mr-2 rounded-md ${
                      currentPage === pageNumber
                        ? "bg-gray-500 text-white"
                        : "bg-red-500"
                    }`}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                className="btn btn-secondary px-4 py-2 rounded-md ml-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;

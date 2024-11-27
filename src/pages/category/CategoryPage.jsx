import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";
import ProductCards from "../shop/ProductCards";

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Call the API with categoryName as the filter
  const { data, isLoading, error } = useFetchAllProductsQuery({
    category: categoryName.toLowerCase(),
  });

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (data && data.products) {
      setFilteredProducts(data.products); // Directly use fetched products
    }
  }, [data]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching products: {error.message}</p>;

  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Browse products in the {categoryName} category.
        </p>
      </section>

      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;

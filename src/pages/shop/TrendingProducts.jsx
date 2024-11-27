import { useState } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productsApi";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  // Pass default query parameters
  const { data, isLoading, error } = useFetchAllProductsQuery({});

  // Use fallback value for products if data is null or undefined
  const products = data?.products || [];

  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (error) return <h1 className="text-center">Error loading products</h1>;

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Products</h2>
      <p className="section__subheader mb-12">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente aut
        nemo totam, unde temporibus animi dolore delectus reprehenderit in atque
        consequatur ab saepe aliquid at perspiciatis ad adipisci natus? Quo.
      </p>

      {/* Product Cards */}
      <div className="mt-12">
        {products.length ? (
          <ProductCards products={products.slice(0, visibleProducts)} />
        ) : (
          <p>No products available.</p>
        )}
      </div>

      {/* Load More Button */}
      {visibleProducts < products.length && (
        <div className="product__btn flex justify-center mt-4">
          <button onClick={loadMoreProducts} className="btn">
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;

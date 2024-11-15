/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import products from "../../data/products.json";
import ProductCards from "../shop/ProductCards";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryName.toLowerCase()
    );
    setFilteredProducts(filtered);
  }, [categoryName]);
    useEffect(() => {
        window.scrollTo(0, 0)
    })
  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section__header capitalize">{categoryName}</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quas
          accusantium quod iure repellat, nemo numquam ex exercitationem, ullam
          id officiis accusamus minus facilis similique magnam architecto
          molestiae, soluta obcaecati!
        </p>
      </section>

      {/* Product Cards */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;

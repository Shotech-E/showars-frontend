/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import { useDispatch } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import ReviewsCard from "../reviews/ReviewsCard";

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data, error, isLoading } = useFetchProductByIdQuery(id); 

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];


  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <h1 className="text-center">Loading...</h1>;
  if (error)
    return (
      <h1 className="text-center">Error loading {error.message}</h1>
    );


  return (
    <>
      <section className="section__container bg-primary-light">
        <h2 className="section header capitalize">Single Product page</h2>
        <div>
          <span>
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span>
            <Link to="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{singleProduct.name}</span>
        </div>
      </section>

      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct.image}
              alt="Single Product Image"
              className="rounded-md:w-1/2 w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct.name}
            </h3>
            <p className="text-xl text-primary mb-8">
              <strong>Price:</strong> {singleProduct.price}{" "}
              <s>{singleProduct.oldPrice}</s>
            </p>
            <p>{singleProduct.description}</p>

            {/* Additional Product Info */}
            <div>
              <p>
                <strong>Category: </strong>
                {singleProduct.category}
              </p>
              <p>
                <strong>Colour: </strong>
                {singleProduct.colour}
              </p>
              <div className="flex gap-1 items-center">
                <strong>Rating: </strong>
                <RatingStars rating={"4.5"} />
              </div>
              <button onClick={() => handleAddToCart(singleProduct)} className="mt-6 px-6 py-3 bg-primary text-white rounded-md">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Display Reviews */}
      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews}/>
      </section>
    </>
  );
};

export default SingleProduct;

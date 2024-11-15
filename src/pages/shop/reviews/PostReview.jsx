/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";

const PostReview = ({ isModalOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { refetch } = useFetchProductByIdQuery(id, { skip: !id });
  const [postReview] = usePostReviewMutation();

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newComment = {
      comment: comment,
      rating: rating,
      userId: user?._id,
      productId: id,
    };
    try {
      const response = await postReview(newComment).unwrap();
      alert("Review posted successfully");
      setComment("");
      setRating(0);
      refetch();
      handleClose();
    } catch (error) {
      alert(error?.data?.message || "All fields are required");
    }
    handleClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white rounded-md p-6 shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Post a Review</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className="cursor-pointer text-yellow-500 text-xl"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="w-full border border-gray-300 rounded-md p-2 mt-2 mb-4 focus:outline-none"
          placeholder="Write a review"
        ></textarea>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="py-2 px-4 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-primary text-white rounded-md"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

PostReview.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default PostReview;

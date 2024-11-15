//import React from "react";
import PropTypes from "prop-types";
import commentorIcon from "../../../assets/avatar.png";
import { formatDate } from "../../../utils/formateDate";
import RatingStars from "../../../components/RatingStars";
import { useState } from "react";
import PostReview from "./PostReview";

const ReviewsCard = ({ productReviews }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = productReviews || [];
  // console.log(reviews);

  // HANDLE OPEN REVIEW MODAL
  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  // HANDLE CLOSE REVIEW MODAL
  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-6 bg-white p-8">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">All Comments</h3>
            <div>
              {reviews.map((review, index) => (
                <div key={index} className="mt-4">
                  <div className="flex gap-4 items-center">
                    <img src={commentorIcon} alt="" className="size-14" />
                    <div className="space-y-1 ">
                      <p className="text-lg font-medium underline capitalize-offset-4 text-blue-400">
                        {review?.userId?.username}
                      </p>
                      <p className="text-[12px] italic">
                        {formatDate(review?.updatedAt)}
                      </p>
                      <RatingStars rating={review?.rating} />
                    </div>
                  </div>
                  <div className="text-gray-600 mt-5 border p-8">
                    <p className="md-w-4/5">{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
      {/* Add Review Button */}
      <div>
        <button
          onClick={handleOpenReviewModal}
          className="px-6 py-3 mt-3 bg-primary text-white rounded-md"
        >
          Add Review
        </button>
      </div>
      {/* Review Modal */}
      <PostReview
        isModalOpen={isModalOpen}
        handleClose={handleCloseReviewModal}
      />
    </div>
  );
};

ReviewsCard.propTypes = {
  productReviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      comment: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      userId: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ),
};

export default ReviewsCard;

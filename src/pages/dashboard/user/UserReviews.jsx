import { useSelector } from "react-redux";
import { useGetReviewsByUserIdQuery } from "../../../redux/features/reviews/reviewsApi";
import { useNavigate } from "react-router-dom";

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);

  const {
    data: reviews,
    error,
    isLoading,
  } = useGetReviewsByUserIdQuery(user?._id);

  const navigate = useNavigate();
  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error || !reviews)
    return <div className="text-center text-red-500">No reviews found</div>;

  const handleReviewCardClick = () => {
    navigate("/shop");
  } 

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold text-gray-800">My Given Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {reviews &&
          reviews.map((review, index) => (
            <div key={index} className="mt-4 shadow-md hover:scale-105 transition-all duration-200 border border-gray-800 rounded-lg p-4 cursor-pointer bg-white ">
              <p className="text-lg font-semibold mb-2">
                Rating: {review?.rating}
              </p>
              <p className="mb-2">
                <strong>Comment: </strong>
                {review?.comment}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Product Id: </strong>
                {review?.productId}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Date: </strong>
                {new Date(review?.createdAt).toDateString()}
              </p>
            </div>
          ))}
        <div onClick={handleReviewCardClick} className="flex items-center justify-center mt-4 shadow-md hover:scale-105 transition-all duration-200 border border-gray-800 rounded-lg p-4 cursor-pointer bg-white hover:bg-primary hover:text-white">
          <span >+</span>
          <p className="ml-2 text-lg font-semibold">Add a Review</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;

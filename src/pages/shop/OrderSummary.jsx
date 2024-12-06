import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { getBaseUrl } from "../../utils/baseURL";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom"; // To navigate to the login page if needed

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth); // User state
  const products = useSelector((state) => state.cart.products);
  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector(
    (state) => state.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const makePayment = async () => {
    if (!user) {
      // User is not logged in, redirect to login page
      alert("Please log in to proceed with the payment.");
      navigate("/login"); // Redirect to the login page (modify the path if needed)
      return;
    }

    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

      if (!stripe) {
        console.error("Stripe initialization failed!");
        return;
      }

      const body = {
        products,
        userId: user?._id,
      };

      const response = await fetch(
        `${getBaseUrl()}/api/orders/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const session = await response.json();

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error.message);
      } else {
        // Payment succeeded, clear the cart
        dispatch(clearCart());
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
    }
  };

  return (
    <div className="bg-gray-100 mt-5 rounded-lg text-base shadow-md">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
        <p>Selected Items: {selectedItems}</p>
        <p>Total: ${totalPrice.toFixed(2)}</p>
        <p>
          Tax ({(taxRate * 100).toFixed(1)}%): ${tax.toFixed(2)}
        </p>
        <h3 className="font-bold">
          Grand Total:{" "}
          <span className="text-green-600">${grandTotal.toFixed(2)}</span>
        </h3>
        <div className="flex flex-col gap-4">
          <button
            onClick={handleClearCart}
            className="bg-red-500 px-4 py-2 text-white rounded-md hover:bg-red-600 transition-all"
          >
            <span className="flex items-center justify-center gap-2">
              <i className="ri-delete-bin-line"></i> Clear Cart
            </span>
          </button>
          <button
            onClick={makePayment}
            className="bg-green-500 px-4 py-2 text-white rounded-md hover:bg-green-600 transition-all"
          >
            <span className="flex items-center justify-center gap-2">
              <i className="ri-bank-card-line"></i> Checkout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

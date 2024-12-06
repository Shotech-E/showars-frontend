import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getBaseUrl } from "../utils/baseURL";
import { loadStripe } from "@stripe/stripe-js";

const Cancel = () => {
  const navigate = useNavigate();
//   const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((state) => state.cart.products);

  useEffect(() => {
    console.log("Payment was canceled");
  }, []);

  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

      if (!stripe) {
        console.error("Stripe initialization failed!");
        return;
      }

      if (!products.length) {
        console.error("Cart is empty!");
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
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
    }
  };

  return (
    <section className="section__container rounded p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">
        Payment Canceled
      </h2>
      <p className="mb-4 text-gray-700">
        Your payment process was canceled. If this was an error, you can retry
        the payment or contact customer support for assistance.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={makePayment}
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-all"
        >
          Retry Payment
        </button>
        <button
          onClick={() => navigate("/shop")}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-all"
        >
          Back to Shop
        </button>
      </div>
    </section>
  );
};

export default Cancel;

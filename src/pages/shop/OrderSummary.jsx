/* eslint-disable no-unused-vars */
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from '../../redux/features/cart/cartSlice';
import { getBaseUrl } from "../../utils/baseURL";
import { loadStripe } from "@stripe/stripe-js";


const OrderSummary = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  // console.log(user);
  
  const products = useSelector((state) => state.cart.products);
  // console.log(products);

  const { selectedItems, totalPrice, tax, taxRate, grandTotal } = useSelector((store) => store.cart);
  
  const handleClearCart = () => {
    dispatch(clearCart());
  }

  // payment integration
  const makePayment = async (e) => {
    // const stripe = await loadStripe(
    //   "pk_test_51QE7lZLe2VbPgG0NZaZq2psyWzjs53X2DvSib6oPaAt7HmbJ0Oz5dBr171qLggl9zgG9l9v6ZLPETwxMvzk3PVc300CGtZH8Cp"
    // );
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);
    console.log(stripe);
    const body = {
      products: products,
      userId: user?._id,
    }

    const headers = {
      "Content-Type": "application/json",
    }

    const response = await fetch(
      `${getBaseUrl()}/api/orders/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    console.log("session: ", session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    console.log("Result:", result);

    if(result.error) {
      console.log("Error:", result.error);
    }
  }

  return (
    <div className="bg-primary-light mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">Order Summary</h2>
        <p>Selected Items: {selectedItems}</p>
        <p>Total: {totalPrice.toFixed(2)}</p>
        <p>
          Tax ({taxRate * 100}%): ${tax.toFixed(2)}
        </p>
        <h3 className="font-bold">
          Grand Total:
          <span className="text-primary">${grandTotal.toFixed(2)}</span>
        </h3>
        <div className="px-4 mb-6">
          <button onClick={(e) => {e.stopPropagation(); handleClearCart()}} className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
            <span className='mr-2'>Clear Cart</span><i className='ri-delete-bin-line'></i>
          </button>

          <button onClick={(e) => { e.stopPropagation(); makePayment();  }} className="bg-green-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center">
            <span className='mr-2'>Checkout</span><i className='ri-bank-card-line'></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

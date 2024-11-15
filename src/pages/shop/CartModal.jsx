/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from "react";
import OrderSummary from "./OrderSummary";
import { useDispatch } from "react-redux";
import { updateQuantity, removeFromCart } from "../../redux/features/cart/cartSlice";

const cartModal = ({ products, isOpen, onClose }) => {
  const dispatch = useDispatch();
  
    const handleQuantity = (type, id) => { 
        const payload = { type, id }
        dispatch(updateQuantity(payload));
  }
  
  const handleRemove = (e, id) => {
    e.preventDefault();
    dispatch(removeFromCart({ id }));
  }
  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-50 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full h-full bg-white p-8 overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              <i className="ri-xrp-fill bg-black p-1 text-white"></i>
            </button>
          </div>
          {/* Cart details */}
          <div className="cart-items">
            {products.length === 0 ? (
              <div>Your Cart is Empty</div>
            ) : (
              products.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row md:items-center md:justify-between shadow-md md:p-5 p-2 mb-4"
                >
                  <div className="flex items-center">
                    <span className="mr-4 px-1 bg-primary text-white rounded-full">
                      0{index + 1}
                    </span>
                    <img
                      src={item.image}
                      alt=""
                      className="size-12 object-cover mr-4"
                    />
                    <div>
                      <h5 className="text-gray-600 text-sm">{item.name}</h5>
                      <p>${Number(item.price).toFixed(2)}</p>
                    </div>
                    <div className="flex flex-row md:justify-start justify-end items-center mt-2">
                              <button onClick={ () => handleQuantity("dec", item._id)} className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white ml-8">
                        -
                      </button>
                      <span className="px-2 text-center mx-1">
                        {item.quantity}
                      </span>
                      <button onClick={ () => handleQuantity("inc", item._id)} className="size-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-white">
                        +
                      </button>
                      <div className="ml-5">
                        <button onClick={(e) => handleRemove(e, item._id)} className="text-red-500 hover:text-red-800 mr-4 ">
                          <i className="ri-delete-bin-2-line "></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Cart Calculation */}
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
};

export default cartModal;
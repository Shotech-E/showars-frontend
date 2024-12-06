import { createSlice } from "@reduxjs/toolkit";

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : undefined; // Return parsed cart or undefined if not found
};

// Set the initial state from localStorage if available
const initialState = loadCartFromLocalStorage() || {
  products: [],
  selectedItems: 0,
  totalPrice: 0,
  tax: 0,
  taxRate: 0.05,
  grandTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const isExist = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (!isExist) {
        state.products.push({ ...action.payload, quantity: 1 });
      } else {
        alert("Item already exists");
      }

      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    updateQuantity: (state, action) => {
      const products = state.products.map((product) => {
        if (product._id === action.payload.id) {
          if (action.payload.type === "inc") {
            product.quantity += 1;
          } else if (action.payload.type === "dec") {
            if (product.quantity > 1) {
              product.quantity -= 1;
            }
          }
        }
        return product;
      });

      state.products = products;
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload.id
      );
      state.selectedItems = setSelectedItems(state);
      state.totalPrice = setTotalPrice(state);
      state.tax = setTax(state);
      state.grandTotal = setGrandTotal(state);

      // Save to localStorage
      localStorage.setItem("cart", JSON.stringify(state));
    },

    clearCart: (state) => {
      state.products = [];
      state.selectedItems = 0;
      state.totalPrice = 0;
      state.tax = 0;
      state.grandTotal = 0;

      // Remove from localStorage
      localStorage.removeItem("cart");
    },
  },
});

// Utility functions for calculating the cart values
export const setSelectedItems = (state) =>
  state.products.reduce((total, product) => total + product.quantity, 0);

export const setTotalPrice = (state) =>
  state.products.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  );

export const setTax = (state) => setTotalPrice(state) * state.taxRate;

export const setGrandTotal = (state) => setTotalPrice(state) + setTax(state);

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;

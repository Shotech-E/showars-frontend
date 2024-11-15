import { configureStore } from "@reduxjs/toolkit";
import productApi from "./features/products/productsApi"; 
import cartReducer from "./features/cart/cartSlice";
import authApi from "./features/auth/authApi";
import authReducer from "./features/auth/authSlice";
import reviewApi from "./features/reviews/reviewsApi";
import statsApi from "./features/stats/statsApi";
import orderApi from "./features/order/orderApi";

export const store = configureStore({
    reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productApi.reducerPath]: productApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, productApi.middleware, reviewApi.middleware, statsApi.middleware, orderApi.middleware),
});

export default store;
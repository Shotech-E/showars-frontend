import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CategoryPage from "../pages/category/CategoryPage";
import Search from "../pages/search/Search";
import ShopPage from "../pages/shop/ShopPage";
import SingleProduct from "../pages/shop/productDetails/SingleProduct";
import Login from "../components/Login";
import Register from "../components/Register";
import ForgottenPassword from "../password/ForgottenPassword";
import PaymentSuccess from "../components/PaymentSuccess";
import TimelineStep from "../components/TimelineStep";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import PrivateRoute from "../routers/PrivateRoute";
import UserMainDashboard from "../pages/dashboard/user/dashboard/UserMainDashboard";
import UserOrders from "../pages/dashboard/user/UserOrders";
import OrderDetails from "../pages/dashboard/user/OrderDetails";
import UserPayments from "../pages/dashboard/user/UserPayments"
import UserReviews from "../pages/dashboard/user/UserReviews";
import UserProfile from "../pages/dashboard/user/UserProfile";
import AdminMainDashboard from "../pages/dashboard/admin/dashboard/AdminMainDashboard";
import AddProduct from "../pages/dashboard/admin/product/AddProduct";
import ManageProduct from "../pages/dashboard/admin/product/ManageProduct";
import ManageOrders from "../pages/dashboard/admin/order/ManageOrders";
import ManageUsers from "../pages/dashboard/admin/user/ManageUsers";
import UpdateProduct from "../pages/dashboard/admin/product/UpdateProduct";


const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/shop",
        element: <ShopPage />,
      },
      {
        path: "/shop/:id",
        element: <SingleProduct />,
      },
      {
        path: "/success",
        element: <PaymentSuccess />,
      },
      {
        path: "/order/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "/timeline",
        element: <TimelineStep />,
      },
    ],
  },

  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgottenPassword />,
  },

  // Admin Stats Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // user route
      {
        path: "",
        element: <UserMainDashboard />,
      },
      {
        path: "orders",
        element: <UserOrders />,
      },
      {
        path: "payments",
        element: <UserPayments />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
      {
        path: "reviews",
        element: <UserReviews />,
      },

      // admin route
      {
        path: "admin",
        element: (
          <PrivateRoute role="admin">
            <AdminMainDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "add-new-product",
        element: (
          <PrivateRoute role="admin">
            <AddProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-products",
        element: (
          <PrivateRoute role="admin">
            <ManageProduct/>
          </PrivateRoute>
        ),
      },
      {
        path: "update-product/:id",
        element: (
          <PrivateRoute role="admin">
            <UpdateProduct/>
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute role="admin">
            <ManageUsers />
          </PrivateRoute>
        ),
      },
      {
        path: "manage-orders",
        element: (
          <PrivateRoute role="admin">
            <ManageOrders/>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
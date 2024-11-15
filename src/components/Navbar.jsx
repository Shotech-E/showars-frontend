/* eslint-disable no-unused-vars */
import React, {useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import CartModal from '../pages/shop/CartModal'
import avatarImg from '../assets/avatar.png'
import { logout } from '../redux/features/auth/authSlice'
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setisCartOpen] = useState(false);

  const handleCartToggle = () => {
    setisCartOpen(!isCartOpen);
  };

  // SHOW USER IF LOGGED IN
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  // DROPDOWN MENU
  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // ADMIN DROPDOWN MENU
  const showAdminDropdown = [
    { label: "Dashboard", path: "/dashboard/admin" },
    { label: "Manage Products", path: "/dashboard/manage-products" },
    { label: "All Order", path: "/dashboard/manage-orders" },
    { label: "Add Product", path: "/dashboard/add-new-product" },
  ];

  // USER DROPDOWN MENU
  const showUserDropdown = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Profile", path: "/dashboard/profile" },
    { label: "Payments", path: "/dashboard/payments" },
    { label: "Orders", path: "/dashboard/orders" },
  ];

  const dropdownMenu = user?.role === "admin" ? [...showAdminDropdown] : [...showUserDropdown];
  
  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error("Error during log out:", error);
    }
  };
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen2x1 mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop/">Shop</Link>
          </li>
          <li className="link">
            <Link to="/pages">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>

        <div className="nav__logo">
          <Link to="/">
            <span>Showars</span>
          </Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <i className="ri-search-line"></i>
            </Link>
          </span>

          <span>
            <button onClick={handleCartToggle} className="hover:text-primary">
              <i className="ri-shopping-cart-line"></i>
              <sup className="text-sm inline-block px-1.5 text-center bg-primary text-white rounded-full">
                {products.length}
              </sup>
            </button>
          </span>

          <span>
            {user && user ? (
              <>
                <img onClick={handleDropdownToggle}
                  className="h-6 w-6 rounded-full cursor-pointer"
                  src={user?.profileImage || avatarImg}
                  alt="Profile Image"
                />
                {
                  showDropdown && (
                    <div className="absolute right-0 top-12 bg-white shadow-md p-4 mt-3 w-48 border border-gray-200 rounded-lg z-50">
                      <ul className='font-medium space-y-4 p-2'>
                        {dropdownMenu.map((menu, index) => (
                          <li key={index}>
                            <Link onClick={() => setShowDropdown(false)} className="dropdown-items" to={menu.path}>{menu.label}</Link>
                          </li>
                        ))}
                        <li><Link onClick={handleLogout} className="dropdown-items">Logout</Link></li>
                      </ul>
                    </div>
                  )
                }
              </>
            ) : (
              <Link to="/login">
                <i className="ri-account-circle-line"></i>
              </Link>
            )}
          </span>
        </div>
      </nav>

      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
}

export default Navbar
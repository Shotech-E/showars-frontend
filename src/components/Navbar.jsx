import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CartModal from "../pages/shop/CartModal";
import avatarImg from "../assets/avatar.png";
import { logout } from "../redux/features/auth/authSlice";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();

  const getDropdownMenu = (role) => {
    if (role === "admin") {
      return [
        { label: "Dashboard", path: "/dashboard/admin" },
        { label: "Manage Products", path: "/dashboard/manage-products" },
        { label: "All Orders", path: "/dashboard/manage-orders" },
        { label: "Add Product", path: "/dashboard/add-new-product" },
      ];
    }
    return [
      { label: "Dashboard", path: "/dashboard" },
      { label: "Profile", path: "/dashboard/profile" },
      { label: "Payments", path: "/dashboard/payments" },
      { label: "Orders", path: "/dashboard/orders" },
    ];
  };

  const dropdownMenu = getDropdownMenu(user?.role);

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <header className="fixed w-full bg-white shadow-md z-50">
      <nav className="max-w-screen-xl mx-auto px-4 flex justify-between items-center py-2">
        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-2xl focus:outline-none"
          >
            <i className={isMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
          </button>
        </div>

        {/* Logo */}
        <div className="nav__logo">
          <Link to="/">
            <span className="text-xl font-bold">Showars</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <ul
          className={`absolute top-16 left-0 w-full bg-white shadow-md lg:static lg:flex lg:bg-transparent lg:shadow-none lg:space-x-6 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <li className="py-2 px-4 lg:py-0">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <Link to="/shop/" className="hover:text-primary">
              Shop
            </Link>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <Link to="/pages" className="hover:text-primary">
              Pages
            </Link>
          </li>
          <li className="py-2 px-4 lg:py-0">
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
          </li>
        </ul>

        {/* Icons - Cart and Profile */}
        <div className="flex items-center space-x-4">
          <Link to="/search">
            <i className="ri-search-line text-xl"></i>
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative hover:text-primary"
          >
            <i className="ri-shopping-cart-line text-xl"></i>
            {products.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                {products.length}
              </span>
            )}
          </button>

          {/* User Profile */}
          {user ? (
            <div className="relative">
              <img
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="h-6 w-6 rounded-full cursor-pointer"
                src={user.profileImage || avatarImg}
                alt="Profile"
              />
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 bg-white shadow-md w-48 rounded-lg"
                >
                  <ul className="py-2">
                    {dropdownMenu.map((menu, index) => (
                      <li key={index} className="px-4 py-2 hover:bg-gray-100">
                        <Link
                          to={menu.path}
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {menu.label}
                        </Link>
                      </li>
                    ))}
                    <li className="px-4 py-2 hover:bg-gray-100">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <i className="ri-account-circle-line text-xl"></i>
            </Link>
          )}
        </div>
      </nav>

      {/* Cart Modal */}
      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;

import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    alert("Please login first");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (role && user.role !== role) {
    alert("You do not have permission to access this page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

// PropTypes validation
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  role: PropTypes.string,
};

export default PrivateRoute;

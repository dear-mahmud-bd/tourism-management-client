import { useContext } from "react";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";


const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location.pathname);

    if (loading) {
        return <div className='flex justify-center my-20'><p className="loading loading-bars loading-lg text-customLightBrown"></p></div>
    }
    if (user) return children;

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoute;
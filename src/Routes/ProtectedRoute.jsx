import { useContext } from "react";
import PropTypes from 'prop-types';
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import Loading from "../components/Loading";


const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    // console.log(location.pathname);

    if (loading) return <Loading />
    if (user) return children;

    return <Navigate state={location.pathname} to="/login"></Navigate>;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoute;
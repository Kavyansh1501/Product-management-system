import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {

    const token = localStorage.getItem("token");

    return token ? children : <Navigate to="/Mongoose1" />;
}

export default PrivateRoute;
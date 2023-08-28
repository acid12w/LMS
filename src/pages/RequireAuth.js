import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({allowedRole}) => {
    const location = useLocation();
    const { roles } = useAuth();

    const content = (
        roles.some(role => allowedRole.includes(role))
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    )
    
    return content
}

export default RequireAuth;
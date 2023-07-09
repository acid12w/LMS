import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuth = ({allowedRole}) => {
    const auth = useSelector((state) => state.auth);
   
    const location = useLocation();

    console.log(auth)

    return (
        auth?.user?.userRole?.find(role => allowedRole?.includes(role)) ? <Outlet/>
        : auth.token 
            ? <Navigate to="/unauthorized" state={{ from: location }} replace /> 
            : <Navigate to="/user/?query=login" state={{from: location}} replace />
    )
}

export default RequireAuth;
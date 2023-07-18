import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useEffect, useState } from "react";


const RequireAuth = ({allowedRole}) => {
    const auth = useSelector((state) => state.auth);
    const location = useLocation();

    if(auth.token === null) return <p>Loading...</p>;

    return (
        auth?.user?.userRole?.find(role => allowedRole?.includes(role)) ? <Outlet/>
        : auth?.token   
            ? <Navigate to="/unauthorized" state={{ from: location }} replace /> 
            : <Navigate to="/user/?query=login" state={{from: location}} replace />
    )
}

export default RequireAuth;
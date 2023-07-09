import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCredentials } from "../store/Auth-slice";
import { useGetReauthQuery} from "../store/authApiSlice";

export const PersistLogin = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);

    const {data} =  useGetReauthQuery();

    useEffect(() => { 
        if(!data){
            return <p>...Loading</p>
        } console.log('running')
        dispatch(setCredentials({ token : {accessToken: data.accessToken }, user:{ email: "johnDoe_3@test.com", currentUsername: data.username, bio: data.bio, userId: data.userId, myCourses: data.myCourses, userRole: data.userRole  }}))
        setIsLoading(false);
    }, [data])
   
    
    return (
        <>
            {isLoading
                ? <p>Loading...</p>
                : <Outlet/>
            }
        </>
    )
}


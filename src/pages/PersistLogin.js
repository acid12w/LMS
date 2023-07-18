import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCredentials } from "../store/Auth-slice";
import { useLazyGetReauthQuery} from "../store/authApiSlice";
import useAuth from "../hooks/useAuth";

export const PersistLogin = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState(true);
    const [getReauth, result] =  useLazyGetReauthQuery();
    const { persist } = useAuth();


    useEffect(() => { 
        const verifyRefreshToken = async () => {
            try {
                if(auth) return;
                await getReauth();
                dispatch(setCredentials({ token : {accessToken: result.data.accessToken }, user:{ email: "johnDoe_3@test.com", currentUsername: result.data.username, bio: result.data.bio, userId: result.data.userId, myCourses: result.data.myCourses, userRole: result.data.userRole  }}))
            }catch(error){
                console.error(error);
            }finally {
                setIsLoading(false);
            } 
        } 
        persist ? verifyRefreshToken() : setIsLoading(false);

    }, [result, getReauth, dispatch, persist, auth])

    console.log(result);
    console.log(persist);

    return (
        <>{
            isLoading
                ? <p>Loading...</p>
                : <Outlet/>
            }
        </>
    )
}


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCredentials } from "../store/Auth-slice";
import { useLazyGetReauthQuery} from "../store/authApiSlice";

export const PersistLogin = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth.user);
    const [isLoading, setIsLoading] = useState(true);
    const [getReauth, result] =  useLazyGetReauthQuery();

    useEffect(() => { 
        const verifyRefreshToken = async () => {
            try {
                if(auth) return;
                await getReauth();
                dispatch(setCredentials({ token : {accessToken: result.data.accessToken }, user:{ email: "johnDoe_3@test.com", currentUsername: result.data.username, bio: result.data.bio, userId: result.data.userId, myCourses: result.data.myCourses, userRole: result.data.userRole  }}))
            }catch(error){
                console.error(error)
            }finally {
                setIsLoading(false);
            }
        } 
        verifyRefreshToken();
    }, [result])

    return (
        <>{
            isLoading
                ? <p>Loading...</p>
                : <Outlet/>
            }
        </>
    )
}


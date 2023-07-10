import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { setCredentials } from "../store/Auth-slice";
import { useGetReauthQuery} from "../store/authApiSlice";

export const PersistLogin = () => {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);


    const auth  = useSelector(state => state.auth.user)
    const {data} =  useGetReauthQuery();


    useEffect(() => { 
        if(!data){
                return <p>...Loading</p>
            } else {
                const verifyRefreshToken = async () => {
            
                    try {
                        dispatch(setCredentials({ token : {accessToken: data.accessToken }, user:{ email: "johnDoe_3@test.com", currentUsername: data.username, bio: data.bio, userId: data.userId, myCourses: data.myCourses, userRole: data.userRole  }}))
                    }catch(error){
                        console.error(error)
                    }finally {
                        setIsLoading(false);
                    }
                } 
                verifyRefreshToken()
            }
       
    }, [])

    console.log(isLoading)
   
    
    return (
        <>{
            isLoading
                ? <p>Loading...</p>
                : <Outlet/>
            }
        </>
    )
}


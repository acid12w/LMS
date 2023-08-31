import { useEffect, useState, useRef } from "react";
import {  useSelector } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import usePersist from "../hooks/usePersist";
import { useGetReauthMutation} from "../store/authApiSlice";



const PersistLogin = () => {

    const [persist] = usePersist()
    const token = useSelector((state) => state.auth.user);
    const [trueSuccess, setTrueSuccess] = useState(false);

    const [getReauth, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useGetReauthMutation()


    useEffect(() => {

            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    await getReauth()
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.error(err)
                }
            }
            if (!token && persist) verifyRefreshToken()

        // eslint-disable-next-line
    
    }, []);

    let content = null;
    if (!persist) { // persist: no
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { //persist: yes, token: no
        console.log('loading')
        content = <p>...loading</p>
    } else if (isError) { //persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    }else if (isSuccess && trueSuccess) { //persist: yes, token: yes
        console.log('success')
        content = <Outlet />
    } else if (token && isUninitialized) { //persist: yes, token: yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet />
    } 

    return content;
}
export default PersistLogin
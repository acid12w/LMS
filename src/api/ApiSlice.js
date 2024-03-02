import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials} from '../store/Auth-slice';


const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3001',
    // baseUrl: 'https://lms-api-rt1y.onrender.com',

    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers
    }
    
})
  
const baseQueryWithReauth = async (args, api, extraOptions) => { 
    let result = await baseQuery(args, api, extraOptions);
    // console.log(result)

    if (result?.error?.data?.statusCode === 401) {
        console.log('sending refresh token')
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions);  
        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            const accessToken = refreshResult.data.accessToken;
            // store the new token 
            api.dispatch(setCredentials({ token : {accessToken}, user: user}));
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
            console.log(result)
        } else {
            if(refreshResult?.error?.data?.statusCode === 401) {
            refreshResult.error.message = "token expired"
            console.log(refreshResult.error.message)
        }
        // api.dispatch(logout())
        return refreshResult;
        }
    }
    // console.log(result)
    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})


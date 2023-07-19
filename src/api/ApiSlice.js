import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../store/Auth-slice';


const baseQuery = fetchBaseQuery({
    // baseUrl: 'http://localhost:3001',
    baseUrl: 'https://lms-api-rt1y.onrender.com',

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
    
    if (result?.error?.data?.statusCode === 401) {
     
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions);

        if (refreshResult.data) {
          
            const user = api.getState().auth.user;
            const accessToken = refreshResult.data.accessToken;
            // store the new token 
            api.dispatch(setCredentials({ token : {accessToken}, user: user}));
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
            console.log(result)
        } else {
            
            api.dispatch(logout())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})


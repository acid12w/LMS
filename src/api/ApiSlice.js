import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, logout } from '../store/Auth-slice';


const baseQuery = fetchBaseQuery({
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
    console.log(result);

    if (result?.error?.data?.statusCode === 401) {
        console.log(result.error);
        // send refresh token to get new access token 
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
        console.log(refreshResult);

        if (refreshResult.data) {
            console.log("data found");
            const user = api.getState().auth.user;
            const token = refreshResult.data;
            // store the new token 
            api.dispatch(setCredentials({ user, token}))
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
        } else {
            console.log("data not found");
            api.dispatch(logout())
        }
    }

    return result;
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Comment', 'Course'],
    endpoints: builder => ({})
})
 
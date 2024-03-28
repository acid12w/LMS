import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials} from '../store/Auth-slice';

const url = process.env.NODE_ENV === 'production' ? 'https://lms-api-rt1y.onrender.com': 'http://localhost:3001';

const baseQuery = fetchBaseQuery({
    baseUrl: url,

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
       
        if (refreshResult?.data) {
            const user = api.getState().auth.user;
            const accessToken = refreshResult.data.accessToken;
            // store the new token 
            api.dispatch(setCredentials({ token : {accessToken}, user: user}));
            // retry the original query with new access token 
            result = await baseQuery(args, api, extraOptions)
          
        } else {
            if(refreshResult?.error?.data?.statusCode === 401) {
            refreshResult.error.message = "token expired"
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


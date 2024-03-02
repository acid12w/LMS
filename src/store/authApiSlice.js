import { apiSlice } from "../api/ApiSlice";
import { setCredentials, logout} from './Auth-slice'

export const authApiSlice = apiSlice.injectEndpoints({
    
    tagTypes: ['Comment', 'User'],
    endpoints: builder => ({
        signup: builder.mutation({
            query: credentials => ({
                url: '/auth/signup',
                method: 'POST',
                body: credentials
            })
        }),
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: {...credentials}
            })
        }),
        signout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(logout());
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        getReauth: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setCredentials({ token : {accessToken: data.accessToken }, user:{ email: data.email, currentUsername: data.username, bio: data.bio, userId: data.userId, myCourses: data.myCourses, userRole: data.userRole, profileImage: data.profileImage }}))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        getUserProfile: builder.query({
            query: (id) => `/auth/profile/${id}`
        }),
        getUserCourse: builder.query({
            query: (id) => `/userCourses/${id}`
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({ 
                url: `/auth/edit/${data.email}`,
                method: 'PATCH',
                body: {...data.payload},  
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const {
    useSignupMutation,
    useLoginMutation,
    useSignoutMutation,
    useGetReauthMutation,
    useGetUserProfileQuery,
    useGetUserCourseQuery,
    useUpdateUserProfileMutation,
} = authApiSlice;
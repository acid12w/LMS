import { apiSlice } from "../api/ApiSlice";

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
            })
        }),
        getReauth: builder.query({
            query: () => '/auth/refresh',
        }),
        getUserProfile: builder.query({
            query: (id) => `/auth/profile/${id}`
        }),
        getUserCourse: builder.query({
            query: (id) => `/userCourses/${id}`
        }),
        updateUserProfile: builder.mutation({
            query: (data, currentUsername) => ({
                url: `/auth/edit/${currentUsername}`,
                method: 'PATCH',
                body: data
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const {
    useSignupMutation,
    useLoginMutation,
    useSignoutMutation,
    useLazyGetReauthQuery,
    useGetUserProfileQuery,
    useGetUserCourseQuery,
    useUpdateUserProfileMutation,
} = authApiSlice;
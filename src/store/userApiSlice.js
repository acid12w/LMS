import { apiSlice } from "../api/ApiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['User'],
    endpoints: builder => ({
        getUserCourse: builder.query({
            query: (id) => `/userCourses/${id}`
        }),
        addUserCourse: builder.mutation({
            query: (data) => ({
                url: `/userCourses`,
                method: 'POST',
                body: data.course
            }),
            invalidatesTags: ['User']
        }),
        updateUserCourse: builder.mutation({
            query: (data) => ({
                url: `/userCourses/${data.userLessonId}`,
                method: 'PATCH',
                body: data.payload
            }),
            invalidatesTags: ['User']
        }),
    })
})

export const {
    useGetUserCourseQuery,
    useAddUserCourseMutation,
    useUpdateUserCourseMutation,
} = authApiSlice;
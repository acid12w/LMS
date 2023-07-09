import { apiSlice } from "../api/ApiSlice";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMycourse: builder.query({
            query: (id) => `/userCourses/${id}`,
            providesTags: ['Mycourse']
         }), 
        addUserCourse: builder.mutation({
            query: (data) => ({
                url: `/userCourses`,
                method: 'POST',
                body: data.course
            }),
            invalidatesTags: ['Mycourse'],
        }),
        updateUserCourse: builder.mutation({
            query: (data) => ({
                url: `/userCourses/${data.userLessonId}`,
                method: 'PATCH',
                body: data.payload
            }),
            invalidatesTags: ['Mycourse'],
        }),
    }),
})

export const {  useGetMycourseQuery,useGetUserCourseQuery, useAddUserCourseMutation, useUpdateUserCourseMutation } = userApiSlice;



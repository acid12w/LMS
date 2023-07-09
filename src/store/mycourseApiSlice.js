import { apiSlice } from "../api/ApiSlice";

export const mycourseApiSlice = apiSlice.enhanceEndpoints({ addTagTypes: ['Mycourses'] }).injectEndpoints({
    tagTypes: ['Mycourses'],
    endpoints: (builder) => ({
        getUserCourse: builder.query({
            query: (id) => `/userCourses/${id}`,
            providesTags: ['Mycourses'], 
        }),
    }),  
})

export const { useGetUserCourseQuery } = mycourseApiSlice;
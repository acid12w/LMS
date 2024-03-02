import { apiSlice } from "../api/ApiSlice";

export const courseApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllcourses: builder.query({
            query: () => '/mycourses',
            providesTags: ['Course']
        }),
        getCourseById: builder.query({
            query: (id) => `mycourses/${id}`,
            providesTags: ['Course'],
        }),
       
        getCourseByInstructor: builder.query({
            query: (id) => `mycourses/instructor/${id}`,
            providesTags: ['Course']
        }),
        removeCourse: builder.mutation({
            query: (id) => ({
                url: `/mycourses/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course']
        }),
        addCourse: builder.mutation({
            query: (course) => ({
            url: '/mycourses/create',
            method: 'POST',
            body: course, 
            }),
            invalidatesTags: ['Course']
        }), 
        updateCourse: builder.mutation({
            query: (payload) => ({
            url: `/mycourses/edit/${payload.id}`,
            method: 'PATCH',
            body: payload.data, 
            }),
            invalidatesTags: ['Course']
        }), 
       
    }),
})

export const { useGetAllcoursesQuery, useGetCourseByIdQuery, useRemoveCourseMutation, useGetCourseByInstructorQuery, useAddCourseMutation, useUpdateCourseMutation } = courseApiSlice;
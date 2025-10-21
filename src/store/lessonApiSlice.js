import { apiSlice } from "../api/ApiSlice";

export const lessonApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Lesson'],
    endpoints: builder => ({ 
        getLesson: builder.query({
            query: (courseId) => ({
            url: `/lesson/${courseId}`,
            method: 'GET',
            }),
            providesTags: ['Lesson'],
        }),
        getLessonByCourseId: builder.query({
            query: (lessonId) => ({
            url: `/lesson/course/${lessonId}`,
            method: 'GET',
            }),
            providesTags: ['Lesson'],
        }),
        addLesson: builder.mutation({
            query: (payload) => ({
            url: `/lesson/create`,
            method: 'POST',
            body: payload, 
            }),
            invalidatesTags: ['Lesson']
        }),
        updateLesson: builder.mutation({
            query: (payload) => ({
            url: `/lesson/edit/${payload.obj.id}`,
            method: 'PATCH',
            body: payload.obj,  
            }), 
            invalidatesTags: ['Lesson']
        }),
        removeLesson: builder.mutation({
            query: (id) => ({
            url: `/lesson/remove/${id}`,
            method: 'DELETE',
            }),
            invalidatesTags: ['Lesson']
        }),
       
    })
})

export const {
    useGetLessonQuery,
    useGetLessonByCourseIdQuery,
    useAddLessonMutation,
    useUpdateLessonMutation,
    useRemoveLessonMutation,
} = lessonApiSlice;
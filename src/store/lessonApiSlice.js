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
        addLesson: builder.mutation({
            query: (payload) => ({
            url: `/lesson/create`,
            method: 'POST',
            body: payload, 
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
    useAddLessonMutation,
    useRemoveLessonMutation,
    
} = lessonApiSlice;
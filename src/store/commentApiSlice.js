import { apiSlice } from "../api/ApiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllComments: builder.query({
            query: (id) => `/comment/${id}`,
            providesTags: ["Comment"],
        }),
        addComment: builder.mutation({
            query: (comment) => ({
                url: `/comment`,
                method: 'POST',
                body: comment 
            }),
            invalidatesTags: ['Comment'],
        }),
        addReply: builder.mutation({
            query: data => ({
                url: `/comment/${data.lessonId}`,
                method: 'PATCH',
                body: data.reply
            }),
            invalidatesTags: ['Comment'],
        })
    }),
})

export const { useGetAllCommentsQuery, useAddCommentMutation, useAddReplyMutation, useGetUserCourseQuery } = commentApiSlice;

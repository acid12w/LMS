import { apiSlice } from "../api/ApiSlice";

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllComments: builder.query({
            query: (id) => `http://localhost:3001/comment/${id}`,
            providesTags: ["Comment"],
        }),
        addComment: builder.mutation({
            query: (comment) => ({
                url: `http://localhost:3001/comment`,
                method: 'POST',
                body: comment 
            }),
            invalidatesTags: ['Comment'],
        }),
        addReply: builder.mutation({
            query: data => ({
                url: `http://localhost:3001/comment/${data.lessonId}`,
                method: 'PATCH',
                body: data.reply
            }),
            invalidatesTags: ['Comment'],
        }),
    }),
})

export const { useGetAllCommentsQuery, useAddCommentMutation, useAddReplyMutation } = commentApiSlice;

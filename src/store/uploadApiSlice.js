import { apiSlice } from "../api/ApiSlice";

export const uploadApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Upload'],
    endpoints: (builder) => ({
        addThumbNail: builder.mutation({
            query: payload => ({
                url: 'http://localhost:3001/upload',
                method: 'POST',
                body: payload,
            })
        }),
    }),
})

export const { useAddThumbNailMutation} = uploadApiSlice;
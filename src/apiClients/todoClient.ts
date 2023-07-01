import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const todoClient = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000' }),
    endpoints: () => ({}),
})
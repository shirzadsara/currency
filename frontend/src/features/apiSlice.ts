import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000', // آدرس بک‌اند
    //credentials: 'include',  
  }),
  endpoints: (builder) => ({
    getCurrencies: builder.query<any[], void>({
      query: () => '/api/currency',
    }),
  }),
});

export const { useGetCurrenciesQuery } = apiSlice;

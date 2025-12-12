import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsApiHeaders = {
  'x-rapidapi-key': '506cfa1587msha1eebe064ea0044p101c10jsnad0df1124b6b',
  'x-rapidapi-host': 'cryptocurrency-news2.p.rapidapi.com',
};

const baseUrl = 'https://cryptocurrency-news2.p.rapidapi.com';

const createRequest = (url) => ({
  url,
  headers: cryptoNewsApiHeaders,
});

export const newsApi = createApi({
  reducerPath: 'newsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptosNews: builder.query({
      query: (count = 10) =>
        createRequest(`/v1/cryptodaily?limit=${count}`), // ✅ proper endpoint URL
    }),
  }),
});

// ✅ Export the correct hook (matches endpoint name)
export const { useGetCryptosNewsQuery } = newsApi;

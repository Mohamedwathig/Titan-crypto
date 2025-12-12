import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoApiHeaders = {
  'x-rapidapi-key': '506cfa1587msha1eebe064ea0044p101c10jsnad0df1124b6b',
  'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
};

const baseurl = 'https://coinranking1.p.rapidapi.com';

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseurl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getExchanges: builder.query({
      query: () => createRequest(`/exchanges`),
    }),
   getCryptoDetailes: builder.query({
  query: (uuid) => createRequest(`/coin/${uuid}`),
}),
   getCryptoHistory: builder.query({
  query: ({uuid,timeperiod}) => createRequest(`/coin/${uuid}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timeperiod}
`),
})


  
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailesQuery,useGetCryptoHistoryQuery,useGetExchangesQuery } = cryptoApi;


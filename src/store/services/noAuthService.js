import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//Add this in .env file
const url = "https://test-hrm.samaritan-technologies.com/";

const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.REACT_APP_API_ENDPOINT,
  baseUrl: url,
  prepareHeaders: (headers) => {
    return headers;
  },
});

export const noAuthApiService = createApi({
  reducerPath: "noAuthApi",
  baseQuery,
  endpoints: () => ({}),
});

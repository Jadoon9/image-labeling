import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const url = "https://tahir727.pythonanywhere.com/";
const url = "https://test-hrm.samaritan-technologies.com/";

const token = localStorage.getItem("token");

const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.REACT_APP_API_ENDPOINT,
  baseUrl: url,
  prepareHeaders: (headers) => {
    headers.set(
      "Authorization",
      `Token ${localStorage.getItem("token")}` || token
    );
    return headers;
  },
});

export const authApiService = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: () => ({}),
});

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// const url = "https://tahir727.pythonanywhere.com/";
const url = "http://127.0.0.1:8000/api";
export const baseUrl = "http://127.0.0.1:8000/api";

const token = localStorage.getItem("token");

const baseQuery = fetchBaseQuery({
  // baseUrl: process.env.REACT_APP_API_ENDPOINT,
  baseUrl: url,
  prepareHeaders: (headers) => {
    headers.set(
      "Authorization",
      `Token ${localStorage.getItem("token")}` || token
    );
    // headers.set("ngrok-skip-browser-warning", "false");
    return headers;
  },
});

export const authApiService = createApi({
  reducerPath: "authApi",
  baseQuery,
  endpoints: () => ({}),
});

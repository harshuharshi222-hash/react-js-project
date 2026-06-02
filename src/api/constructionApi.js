import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const constructionApi = createApi({
  reducerPath: "constructionApi",

baseQuery: fetchBaseQuery({
  baseUrl: "/api/test/RestAPI_V1/sales/v2/",
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/x-www-form-urlencoded");
    headers.set("Accept", "application/json");
    return headers;
  },
}),

  endpoints: (builder) => ({
    getConstructionLinkPayment: builder.mutation({
      query: (data) => ({
        url: "getConstructionLinkPayment",
        method: "POST",
        body: JSON.stringify(data),
      }),
    }),
  }),
});

export const {
  useGetConstructionLinkPaymentMutation,
} = constructionApi;
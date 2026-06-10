

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const constructionApi = createApi({
  reducerPath: "constructionApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/test/RestAPI_V1/crm/v2/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getConstructionLinkPayment: builder.mutation({
      query: (data) => ({
        url: "getConstructionLinkPayment",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetConstructionLinkPaymentMutation,
} = constructionApi;
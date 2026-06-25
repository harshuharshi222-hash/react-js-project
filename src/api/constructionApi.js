
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const constructionApi = createApi({
  reducerPath: "constructionApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "/api/test/RestAPI_V1/crm/v2/",
     baseUrl: "http://192.168.0.201",
     
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
        body: data,
      }),
    }),

    createConstructionLinkPayment: builder.mutation({
      query: (body) => ({
        url: "createConstructionLinkPayment",
        method: "POST",
        body,
      }),
    }),

    updateConstructionLinkPayment: builder.mutation({
      query: (body) => ({
        url: "updateConstructionLinkPayment",
        method: "POST",
        body,
      }),
    }),

  getAppraisalQuestion: builder.mutation({
  query: (payload) => ({
    url: "/dev/RestAPI_V1/v2/getAppraisalQuestion",
    method: "POST",
    body: payload,
  }),
}), 




  }),
});

export const {
  useGetConstructionLinkPaymentMutation,
  useCreateConstructionLinkPaymentMutation,
  useUpdateConstructionLinkPaymentMutation,
  useGetAppraisalQuestionMutation,
} = constructionApi;
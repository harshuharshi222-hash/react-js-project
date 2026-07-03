
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const constructionApi = createApi({
  reducerPath: "constructionApi",

  baseQuery: fetchBaseQuery({
    // baseUrl: "/api/test/RestAPI_V1/crm/v2/",
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

  createAppraisalQuestion: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/createAppraisalQuestion",
    method: "POST",
    body,
  }),
}),

  getAppraisalQuestionDepartmentFilter: builder.mutation({
  query: (payload) => ({
    url: "/dev/RestAPI_V1/v2/getAppraisalQuestionDepartmentFilter",
    method: "POST",
    body: payload,
  }),
}),

  getAppraisalQuestionDesignationFilter: builder.mutation({
  query: (payload) => ({
    url: "/dev/RestAPI_V1/v2/getAppraisalQuestionDesignationFilter",
    method: "POST",
    body: payload,
  }),
}),

  getAppraisalQuestionCategoryFilter: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/getAppraisalQuestionCategoryFilter",
    method: "POST",
    body,
  }),
}),

getDepartmentMaster: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/getDepartmentMaster",
    method: "POST",
    body,
  }),
}),

getHrAppraisalQuestionDesignationForUpdate: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/getHrAppraisalQuestionDesignationForUpdate",
    method: "POST",
    body,
  }),
}),

getHrAppraisalQuestionDesignation: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/getHrAppraisalQuestionDesignation",
    method: "POST",
    body,
  }),
}),

getAppraisalRating: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/getAppraisalRating",
    method: "POST",
    body,
  }),
}),

  getHrAppraisalQuestionOption: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/getHrAppraisalQuestionOption",
    method: "POST",
    body,
  }),
}),
 
createAppraisalQuestionOption: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/createAppraisalQuestionOption",
    method: "POST",
    body,
  }),
}),

updateAppraisalQuestion: builder.mutation({
  query: (body) => ({
    url: "/dev/RestAPI_V1/v2/updateAppraisalQuestion",
    method: "POST",
    body,
  }),
}),

  }),
});

export const {
  useGetConstructionLinkPaymentMutation,
  useCreateConstructionLinkPaymentMutation,
  useUpdateConstructionLinkPaymentMutation,
  useGetAppraisalQuestionMutation,
  useCreateAppraisalQuestionMutation,
  useGetAppraisalQuestionDepartmentFilterMutation,
  useGetAppraisalQuestionDesignationFilterMutation,
  useGetAppraisalQuestionCategoryFilterMutation,
  useGetDepartmentMasterMutation,
  useGetHrAppraisalQuestionDesignationForUpdateMutation,
  useGetHrAppraisalQuestionDesignationMutation,
  useGetAppraisalRatingMutation,
  useGetHrAppraisalQuestionOptionMutation,
   useCreateAppraisalQuestionOptionMutation,
     useUpdateAppraisalQuestionMutation,
} = constructionApi;
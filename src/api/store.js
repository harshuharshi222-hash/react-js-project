// import { configureStore } from "@reduxjs/toolkit";
// import { constructionApi } from "./constructionApi";

// export const store = configureStore({
//   reducer: {
//     [constructionApi.reducerPath]: constructionApi.reducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       constructionApi.middleware
//     ),
// });


import { configureStore } from "@reduxjs/toolkit";
import { constructionApi } from "./constructionApi";

export const store = configureStore({
  reducer: {
    [constructionApi.reducerPath]: constructionApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      constructionApi.middleware
    ),
});
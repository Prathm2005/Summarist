import { configureStore } from "@reduxjs/toolkit";
import { articleapi } from "./article";
export const store =configureStore({
    reducer:{
        [articleapi.reducerPath]:articleapi.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(articleapi.middleware)
})
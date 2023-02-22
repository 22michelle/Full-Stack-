import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./postSlice";

const store = configureStore({
    reducer: {
        postStore: postReducer,
    },
});

export default store;
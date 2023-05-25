import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./features/userSlicer";
import productReducer from "./features/productSlicer";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },
});
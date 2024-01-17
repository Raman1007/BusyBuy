import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./Redux/Reducers/authReducer";
import { productReducer } from "./Redux/Reducers/productReducer";

export const store = configureStore({
	reducer: {
		authReducer,
		productReducer,
	},
});

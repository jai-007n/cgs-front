import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./features/slices/loginSlice";
import userReducer from "./lib/features/userSlice"
export const store = configureStore({
    reducer: {
        login: loginReducer,
        user:userReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
});
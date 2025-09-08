import { configureStore } from '@reduxjs/toolkit';
import loginReducer from "./features/slices/loginSlice";
import userReducer from "./lib/features/userSlice"
import clientReducer from "./lib/features/clientSlice"
export const store = configureStore({
    reducer: {
        login: loginReducer,
        user:userReducer,
        clientReducer:clientReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    })
});
import {configureStore, Tuple} from '@reduxjs/toolkit'
import userReducer from '../lib/features/userSlice'

export const makeStore = () => {
    return configureStore({
        reducer: {
            user: userReducer
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware({
            serializableCheck: false,
        })
    })
}
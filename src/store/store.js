import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice';
import { todoSlice } from './todo/todoSlice';
import { uiSlice } from './ui/uiSlice';

export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer,
        todo: todoSlice.reducer,
        auth: authSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

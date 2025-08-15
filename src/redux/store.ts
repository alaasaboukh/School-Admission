import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import studentReducer from "./studentSlice"
import teatcherReducer from "./teatcherSlice"
import foodReducer from "./foodSlice"
import calendarReducer from "./calendarSlice"
import menuReducer from "./menuSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        student: studentReducer,
        teacher: teatcherReducer,
        food: foodReducer,
        calendar: calendarReducer,
        menu: menuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

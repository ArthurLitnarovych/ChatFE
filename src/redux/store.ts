import { configureStore } from "@reduxjs/toolkit"
import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux"
import user from "./slices/user";

export const store = configureStore({
    reducer: {
        user,
    },
})

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useReduxDispatch<AppDispatchType>();

export const useSelector: TypedUseSelectorHook<RootStateType> = useReduxSelector
export const useDispatch = useReduxDispatch<AppDispatchType>
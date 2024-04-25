
import { thunk } from "redux-thunk";
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    storage: storage
}

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(thunk)
});
import { useDispatch } from 'react-redux';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./reducers/moviesReducer/moviesReducer";

const rootReducer = combineReducers({
    moviesReducer: moviesReducer,
});

export const store = configureStore({ reducer: rootReducer });
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<any>();




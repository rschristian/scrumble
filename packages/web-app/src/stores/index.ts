import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { useDispatch } from 'react-redux';

import auth from './authStore';
import userLocation from './userLocationStore';

const reducer = combineReducers({
    auth,
    userLocation,
});

const store = configureStore({
    reducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducer>;
export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();

export default store;

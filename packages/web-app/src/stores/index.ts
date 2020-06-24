import { Action, configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import auth from './authStore';
import userLocation from './userLocationStore';

const persistConfig = {
    key: 'root',
    storage,
};

const reducer = combineReducers({
    auth,
    userLocation,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof reducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default { store, persistor: persistStore(store) };

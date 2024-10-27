import { configureStore, SerializableStateInvariantMiddlewareOptions } from '@reduxjs/toolkit';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import rootReducer from './rootReducer';

export type RootState = ReturnType<typeof rootReducer>;

const settings: SerializableStateInvariantMiddlewareOptions = {};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: settings }).concat()
});

if (import.meta.env.NODE_ENV === 'development' && import.meta.hot) {
  import.meta.hot.accept('./rootReducer', () => {
    const newRootReducer = require('./rootReducer').default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export type AppStore = typeof store;

export default store;

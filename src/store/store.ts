import rootReducer from '@/store/rootReducer';
import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import rootSaga from '@/store/rootSaga';

export const makeStore = () => {
  const reducer = rootReducer;
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const store = configureStore({
    reducer,
    middleware,
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

export type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store['getState']>;

export const wrapper = createWrapper(makeStore);
export type AppDispatch = Store['dispatch'];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

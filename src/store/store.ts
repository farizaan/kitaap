import rootReducer from '@/store/rootReducer';
import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';

export const makeStore = () => {
  const reducer = rootReducer;
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];
  const store = configureStore({
    reducer,
    middleware,
  });
  // store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

export type Store = ReturnType<typeof makeStore>;
export type RootState = ReturnType<Store['getState']>;
export const wrapper = createWrapper(makeStore);

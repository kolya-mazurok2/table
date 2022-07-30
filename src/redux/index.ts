import { applyMiddleware, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { auhtorsReducer } from './authors/reducer';

const store = configureStore({
  reducer: {
    authors: auhtorsReducer,
  },
  enhancers: [applyMiddleware(thunk)],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

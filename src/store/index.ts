import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import { loadState, saveState } from 'helpers/session-storage';

import createRootReducer from './root-reducer';

const configureStore = () => {
  const persistedState = loadState();

  const store = createStore(
    createRootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware()),
  );

  store.subscribe(() => {
    saveState(store.getState());
  });

  return store;
};

export type State = ReturnType<typeof store.getState>;

const store = configureStore();

export default store;

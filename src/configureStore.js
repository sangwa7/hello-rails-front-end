import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { greattingsReducer } from './redux/greetings';

const rootReducer = combineReducers({ greeting: greattingsReducer });

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
};

export default configureStore;

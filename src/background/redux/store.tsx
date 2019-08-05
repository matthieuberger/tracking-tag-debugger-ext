import { applyMiddleware, createStore } from 'redux';

import { ITagState } from '../../shared/types';
import { backgroundReducer } from './reducers';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

const store = createStore<ITagState, any, any, any>(
  backgroundReducer,
  applyMiddleware(thunkMiddleware, logger)
);

export default store;

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { backgroundReducer } from './reducers';
import { ITagState } from '../../shared/types';


const store = createStore<ITagState, any, any, any>(
	backgroundReducer,
  applyMiddleware(thunkMiddleware, logger)
);

export default store;

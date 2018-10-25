import {createStore, applyMiddleware } from 'redux';

import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';


const middleware = applyMiddleware(thunk, logger);
const store = createStore(
    rootReducers,
    middleware
)
export default store;
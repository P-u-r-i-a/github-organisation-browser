import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

 let middlewares = [thunk];

 export default createStore(reducers, applyMiddleware(...middlewares));
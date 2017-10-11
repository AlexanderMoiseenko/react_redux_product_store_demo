/* eslint-disable */
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './modules';
import throttle from 'lodash/throttle'
import { saveState } from './helpers/localStorage'
import {pureActions, formListener, routerListener } from './middlewares'

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
   thunk,
   pureActions,
   formListener,
   routerListener,
   routerMiddleware(history)
];

if (process.env.NODE_ENV === 'development') {
   const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__ || null;

  const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true,
    level: 'info',
    diff: true
  });

  middleware.push(logger);

   if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
   }
}

const composedEnhancers = compose(
   applyMiddleware(...middleware),
   ...enhancers
);

const store = createStore(
   rootReducer,
   initialState,
   composedEnhancers
);

store.subscribe(throttle(() => {
  // console.log("inside subscribe LS state: ", loadState());
  saveState({
    products: store.getState().products.productArr
  })
}, 1000));

export default store;



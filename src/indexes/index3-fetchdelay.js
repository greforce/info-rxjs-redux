/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import { Provider } from 'react-redux';
import { rootReducer, rootEpic } from '../redux-examples/redux3-fetchdelay';

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

store.dispatch({ type: 'FETCH_STOCK_PRICE', symbol: 'MDB' });


/* eslint-disable no-unused-vars */
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
// import { Provider } from 'react-redux';
import { rootReducer, rootEpic } from '../redux-examples/redux1-click';

const epicMiddleware = createEpicMiddleware();
const store = createStore(rootReducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

store.dispatch({ type: 'CLICK_INCREMENT' });
// store.dispatch({ type: 'CLICK_INCREMENT' });
setTimeout(() => store.dispatch({ type: 'CLICK_INCREMENT' }), 3000);


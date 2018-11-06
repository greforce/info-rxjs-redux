
import moment from 'moment';
import { combineReducers } from 'redux';
import { of } from 'rxjs';
import { combineEpics, ofType } from 'redux-observable';
import {
  map,
  mapTo,
  mergeMap,
  delay,
  throwError,
  catchError,
} from 'rxjs/operators';

const startTime = moment();

const defaultState = {
  prices: {},
};

// reducer
function pricesReducer(state = defaultState, action) {
  console.log(`+${moment() - startTime}ms`, action);

  switch (action.type) {
    case 'FETCH_STOCK_PRICE_SUCCESS':
      const prices = Object.assign({}, state.prices, { [action.symbol]: action.price });
      const newState = Object.assign({}, state, { prices });
      console.log('New state', newState);
      return newState;

    case 'FETCH_STOCK_PRICE_ERROR':
      console.log('error', action);
      return state;

    default:
      return state;
  }
}

// Epic
function pricesEpic(action$, state) {
  return action$
    .pipe(
      ofType('FETCH_STOCK_PRICE'),
      mergeMap(async action => { // map не сработает пока есть async
        console.log(action);
        const url = `https://api.iextrading.com/1.0/stock/${action.symbol}/price`;
        // throw new Error('oops!');
        // const price = '77.77';
        const price = await fetch(url).then(res => res.text());
        console.log(price);
        return { type: 'FETCH_STOCK_PRICE_SUCCESS', price };
        // return Object.assign({}, action, { type: 'FETCH_STOCK_PRICE_SUCCESS', price });
      }),
      delay(3000),
      catchError(err => of({ type: 'FETCH_STOCK_PRICE_ERROR', message: err.message }))
    );
}


export const rootReducer = combineReducers({
  pricesReducer,
});
export const rootEpic = combineEpics(
  pricesEpic,
);
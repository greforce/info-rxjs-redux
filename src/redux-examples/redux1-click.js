import moment from 'moment';
import { combineReducers } from 'redux';
import { combineEpics, ofType } from 'redux-observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/filter';
import { filter, map, delay, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

const startTime = moment();

const defaultState = {
  count: 0,
};

// reducer
function countReducer(state = defaultState, action) {
  console.log(`+${moment() - startTime}ms`, action);

  switch (action.type) {
    case 'CLICK_INCREMENT':
      console.log('reducer');
      return state;
      
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + action.amount,
      };

    default:
      return state;
  }
}

// Epic
// function countEpic(action$, state) {
//   return action$
//     .pipe(
//       ofType('CLICK_INCREMENT'),
//       delay(1000),
//       map(action => {
//         return { type: 'INCREMENT', amount: 1 };
//       })
//     );
// }

// function countEpic(action$, state) {
//   return action$
//     .pipe(
//       ofType('CLICK_INCREMENT'),
//       delay(1000),
//       mergeMap(action => {
//         return of({ type: 'INCREMENT', amount: 1 });
//       })
//     );
// }

function countEpic(action$, state) {
  
  return action$
    .pipe(
      ofType('CLICK_INCREMENT'),
      delay(1000),
      mergeMap(action => {
        console.log('epic', action);
        return of({ type: 'INCREMENT', amount: 1 }, { type: 'INCREMENT', amount: 2 });
      })
    );
}

export const rootReducer = combineReducers({
  countReducer,
});
export const rootEpic = combineEpics(
  countEpic,
);
/* eslint-disable no-unused-vars */
import { // rxjs-5
  Observable,
  from,
  fromEvent,
  interval,
  of,
} from 'rxjs';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch'; // catchError in v6
import 'rxjs/add/observable/throw'; // throwError in v6


import {
  exampleObservableTimeout1,
  exampleObservableTimeout2,
} from './slides2_3';

import moment from 'moment';

const startTime = moment();

// слайд 5 - более сложные операторы
export const exampleMerge = () => {
  const stream1$ = exampleObservableTimeout1();
  const stream2$ = exampleObservableTimeout2();
  const stream3$ = from(['5', '6', '7']);
  const mergeResult$ = stream3$.merge(stream2$, stream1$);
  mergeResult$
    // .map(data => data + 'aaa')
    .subscribe(val => console.log(`+${moment() - startTime}ms`, val));
}

export const exampleMergeMap = () => {
  const stream1$ = exampleObservableTimeout1();
  const stream2$ = exampleObservableTimeout2();
  // const mergeMapResult = stream1$.mergeMap(x1 => stream2$.map(y2 => x1 + y2));
  const mergeMapResult$ = stream1$.mergeMap(() => stream2$, (x1, y2) => x1 + y2);
  mergeMapResult$.subscribe(val => console.log(`+${moment() - startTime}ms`, val));
}

export const exampleMergeMap1 = () => {
  const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const source$ = from(myArray);
  const newStream$ = source$.mergeMap((e) =>
    fromEvent(document.getElementById('root'), 'click').map(i => e + '-' + i));

  source$.subscribe(
    data => console.log(data, moment().valueOf()),
    err => console.log(err),
    () => console.log('streaming is over')
  );
  newStream$.subscribe(data => console.log(data, moment().valueOf()));
};

export const exampleMergeMap2 = () => {
  const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const source$ = fromEvent(document.getElementById('root'), 'click');
  const newStream$ = source$.mergeMap((e) =>
    from(myArray).map(i => e + '-' + i));

  source$.subscribe(
    data => console.log(data, moment().valueOf()),
    err => console.log(err),
    () => console.log('streaming is over')
  );
  newStream$.subscribe(data => console.log(data, moment().valueOf()));
};

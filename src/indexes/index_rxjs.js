/* eslint-disable no-unused-vars */
import moment from 'moment';
import { of, from } from 'rxjs';
import { map, mergeMap, catchError, delay } from 'rxjs/operators';

import {
  exampleFrom,
  exampleOf,
  exampleFromEvent,
  exampleInterval,
  exampleObservable,
  exampleObservableTimeout1,
} from '../examples/slides2_3';

import {
  exampleMap,
  exampleFilter,
  exampleFilterMap,
  exampleFilterMapReduce,
} from '../examples/slide4';

import {
  exampleMergeMap1,
  exampleMergeMap2,
  exampleMerge,
  exampleMergeMap,
} from '../examples/slide5';

const startTime = moment();

/* slides2_3 */
// exampleFrom();
// exampleOf();
// exampleFromEvent();
// exampleInterval(1000);

// const myObservable$ = exampleObservable();
// myObservable$
//   .map(value => value + 'x')
//   .subscribe(
//     data => console.log(`+${moment() - startTime}ms`, data),
//     err => console.log(err),
//     () => console.log('streaming is over')
//   );

// const myObservable$ = exampleObservableTimeout1();
// myObservable$
//   .map(value => value + 'x')
//   .subscribe(
//     data => console.log(`+${moment() - startTime}ms`, data),
//     err => console.log(err),
//     () => console.log('streaming is over')
//   );


/* slide4 */
// exampleMap();
// exampleFilter();
// exampleFilterMap();
// exampleFilterMapReduce();



/* slide5 */
/* ОСТАВИМ НАПОСЛЕДОК */
// exampleMergeMap1(); // numbers -> click
// exampleMergeMap2(); // click -> numbers
// exampleMerge(); // тут можно и просто merge, и merge + map показать
exampleMergeMap();


/* ОЧЕНЬ ВАЖНО!!! */
// РАЗЛИЧИЯ между map и mergeMap
// map - создает Stream на основе того, что пришло:
// (если данные на входе - то данные и на выходе),
// (если Stream на входе - то Stream и на выходе)
// mergeMap - создает Stream на основе входных данных,
// должны быть либо Streams (Observables), либо Promise, Array, or Iterable.
// и если это Streams - то подписывается на них, и выдает уже результат
// если Promise, Array, or Iterable - преобразует в Stream и выдает результат
/*
from([1, 2, 3, 4])
  .pipe(
    map(i => getFreshApiData()),
  ).subscribe(val => console.log('regular map result: ', val));

from([1, 2, 3, 4])
  .pipe(
    mergeMap(i => getFreshApiData()),
  ).subscribe(val => console.log('mergeMap result: ', val));

function getFreshApiData() {
  return of('retrieved new data')
    .pipe(
      delay(1000)
    );
}

function getFreshApiData2() {
  return 10;
}
*/

console.log('This is the last line of the script');

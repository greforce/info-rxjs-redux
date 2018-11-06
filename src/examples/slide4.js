/* eslint-disable no-unused-vars */
import { // rxjs-5
  Observable,
  from,
  fromEvent,
  interval,
  of,
} from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/reduce';
import moment from 'moment';


// слайд 4 - операторы
export const exampleMap = () => {
  const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const source$ = from(myArray);
  const newStream$ = source$.map((e) => e * 10);

  console.log('origin stream');
  source$.subscribe(
    data => console.log(data, moment().valueOf()),
    err => console.log(err),
    () => console.log('streaming is over')
  );

  console.log('new stream after map');
  newStream$.subscribe(data => console.log(data, moment().valueOf()));
};

// filter
export const exampleFilter = () => {
  const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  const newStream$ = source$.filter((e) => e % 3 === 0);

  console.log('origin stream');
  source$.subscribe(
    data => console.log(data, moment().valueOf()),
    err => console.log(err),
    () => console.log('streaming is over')
  );

  console.log('new stream after filter');
  newStream$.subscribe(data => console.log(data, moment().valueOf()));
};

// filter + map - в данном примере .from работает синхронно
export const exampleFilterMap = () => {
  const myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const source$ = from(myArray);
  const newStream$ = source$
    .filter((e) => e % 3 === 0)
    .map((e) => e * 5);

  console.log('origin stream');
  source$.subscribe(
    data => console.log(data, moment().valueOf()),
    err => console.log(err),
    () => console.log('streaming is over')
  );

  console.log('new stream after filter + map');
  newStream$.subscribe(data => console.log(data, moment().valueOf()));
};

// filter + map + reduce
export const exampleFilterMapReduce = () => {
  let myArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const source$ = from(myArray);
  const newStream$ = source$
    .filter((e) => e % 3 === 0)
    .map((e) => e * 5)
    // .reduce((total, e) => total + e, 0);

  console.log('origin stream');
  source$.subscribe(
    data => console.log('reduced', data, moment().valueOf()),
    err => console.log(err),
    () => console.log('streaming is over')
  );
  
  myArray.push(100);
  console.log('origin stream');
  source$.subscribe(
    data => console.log('reduced', data, moment().valueOf()),
    err => console.log(err),
    () => console.log('streaming is over')
  );

  console.log('new stream after filter + map + reduce');
  newStream$.subscribe(data => console.log(data, moment().valueOf()));
};

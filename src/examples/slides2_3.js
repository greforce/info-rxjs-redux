/* eslint-disable no-unused-vars */
import { // rxjs-5
  Observable,
  from,
  fromEvent,
  interval,
  of,
} from 'rxjs';
import moment from 'moment';


// слайд 2 и 3
// *** from ***
export const exampleFrom = () => {
  const myArray = ['x', 'y', 'react'];
  const source$ = from(myArray);
  source$.subscribe(
    data => console.log(data),
    err => console.log(err),
    () => console.log('streaming is over')
  );
};

// *** of ***
export const exampleOf = () => {
  const source$ = of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
  source$.subscribe(
    data => console.log(data, moment().valueOf()),
    err => console.log(err),
    () => console.log('streaming is over')
  );
};

// *** fromEvent ***
export const exampleFromEvent = () => {
  const source$ = fromEvent(document.getElementById('root'), 'click');
  source$.subscribe(
    data => console.log(data),
    err => console.log(err),
    () => console.log('streaming is over')
  );
};

// *** interval ***
export const exampleInterval = (t) => {
  const source$ = interval(t);
  source$.subscribe(
    data => console.log(data),
    err => console.log(err),
    () => console.log('streaming is over')
  );
};

// *** newObservable ***
export const exampleObservable = () => {
  return new Observable((observer) => {
    const myArray = ['a', 'b', 'c'];
    myArray.forEach(data => observer.next(data));
    observer.complete();
  });
};

export const exampleObservableTimeout1 = () => {
  return new Observable((observer) => {
    setTimeout(() => {
      observer.next('a');
    }, 1000);

    setTimeout(() => {
      observer.next('b');
    }, 3000);

    setTimeout(() => {
      observer.next('c');
      observer.complete();
    }, 8000);
  });
};

export const exampleObservableTimeout2 = () => {
  return new Observable((observer) => {
    setTimeout(() => {
      observer.next('1');
    }, 300);

    setTimeout(() => {
      observer.next('2');
    }, 1500);

    setTimeout(() => {
      observer.next('3');
      observer.complete();
    }, 5000);
  });
};
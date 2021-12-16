import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { Brand } from '../interfaces/Brand.type';
import { Frame } from '../interfaces/Frame';


/**
 * Id слоя
 */
export type LayerId = Brand<number, 'LayerId'>;

@Injectable()
export class LayersService {

  /** Новая позиция коментариев */
  // move$ = new ReplaySubject<{ [key: Frame]: ImageData}>();

  // remove$ = new Subject<Frame>(); 

  // store$ = store<{ [key: Frame]: ImageData}[]>(
  //   merge(),
  //   [],
  // )

  active$ = 1;

  layers = new Layers();


  constructor(
  ) {
    this.layers.add();
    this.layers.add();

    this.layers.pipe(
      tap((v) => { console.log(`log-layers`, Array.from(v)); }),
    ).subscribe();
  }

  add(): void {}
}

// type Layer = { [key: Frame]: ImageData};

class Layers extends Observable<Iterable<{ [key: Frame]: ImageData}>> implements Iterable<{ [key: Frame]: ImageData}>  {

  private behavior = new BehaviorSubject(this);

  [Symbol.iterator]() {
    return this.layers[Symbol.iterator]()
  };

  constructor(
    private layers: { [key: Frame]: ImageData}[] = [],
  ) {
    super((subscriber) => this.behavior.subscribe(subscriber))
  }

  add(): void {
    const layer = {};
    this.layers.push(layer);
    this.notify();
  }

  addAfter(): void {}
  addBefore(): void {}

  move(from: number, to: number): void {
    arrayMoveMutable(this.layers, from, to);
    this.notify();
  }
  // moveUp()
  // moveDown()
  // duplicate() ?

  get(id: number): { [key: Frame]: ImageData} {
    return this.layers[id];
  }
  
  // add(layer: Layer):

  private notify(): void {
    this.behavior.next(this);
  }
}

export function arrayMoveMutable<T>(array: T[], fromIndex: number, toIndex: number): T[] {
	const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

	if (startIndex >= 0 && startIndex < array.length) {
		const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

		const [item] = array.splice(fromIndex, 1);
		array.splice(endIndex, 0, item);
	}

  return array;
}
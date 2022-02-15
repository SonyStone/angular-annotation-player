import { Inject, Injectable } from '@angular/core';
import { select } from '@ngneat/elf';
import { BehaviorSubject, debounceTime, filter, shareReplay, Subject, Subscriber, Subscription, tap } from 'rxjs';
import { FRAME_RATES, FrameRateOption } from 'src/app/interfaces/FrameRate';

import { AppStore } from '../store/app.store';



@Injectable()
export class VideoFPS extends BehaviorSubject<number> {

  readonly frameRates: FrameRateOption[];

  private subscription!: Subscription;

  private destination = new Subject<number>();

  constructor(
    @Inject(AppStore) store: AppStore,
  ) {
    super(store.value.metadata.fps);

    this.subscription = this.destination.pipe(
      filter((fps) => fps > 0 && fps < 9000),
      debounceTime(500),
    ).subscribe((fps) => {
      store.update((state) => {
        state.metadata.fps = fps;
      });
    })


    this.source = store.pipe(
      select((state) => state.metadata.fps),
      shareReplay(),
    );


    this.frameRates = FRAME_RATES;
  }

  next(value: number) {
    this.destination.next((this as any)._value = value);
  }


  error(err: any) {
    this.destination.error(err);
  }

  complete() {
    this.destination.complete();
  }


  protected _subscribe(subscriber: Subscriber<number>): Subscription {
    const subscription = this.source?.subscribe(subscriber) ?? Subscription.EMPTY;

    subscription.add(this.subscription);

    !subscription.closed && subscriber.next(this.value);

    return subscription;
  }
}
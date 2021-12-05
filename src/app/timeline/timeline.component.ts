import { KeyValue } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { map, merge, mergeAll, Observable, ReplaySubject, Subscription, switchAll, tap, withLatestFrom } from 'rxjs';

import { store } from '../canvas/PaintData';
import { Frame } from '../interfaces/Frame';
import { PlayerService } from '../player.service';





@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent implements OnDestroy {

  readonly time$ = this.player.frame$;

  readonly duration$ = this.player.totalFrames$;

  lastMove = new ReplaySubject<Observable<[Frame, Frame]>>()
  lastMove$ = this.lastMove.pipe(mergeAll());

  data$ = store<Map<Frame, ImageData>>(
    merge(
      this.player.store$.pipe(
        map((frames) => () => new Map(frames)),
      ),
      this.lastMove$.pipe(
        map(([oldFrame, newFrame]) => (store: Map<Frame, ImageData>) => {
          const value = store.get(oldFrame)!;
          store.delete(oldFrame);

          store.set(newFrame, value);
    
          return store;
        }),
      )
    ),
    new Map(),
  ).pipe(

  )

  trackByFn(_: number, item: KeyValue<Frame, ImageData>) {
    return item.value;
  }

  private subscription = new Subscription();

  constructor(
    readonly player: PlayerService,
  ) {
    this.player.move.next(this.lastMove$.pipe(
      withLatestFrom(this.data$),
      map(([_, data]) => data),
    ))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
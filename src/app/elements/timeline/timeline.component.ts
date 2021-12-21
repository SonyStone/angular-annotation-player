import { KeyValue } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { map, Subscription, withLatestFrom } from 'rxjs';

import { Frame } from '../../interfaces/Frame';
import { LayersStore } from '../../utilities/layers.store';
import { TimelineCommentsService } from '../../utilities/timeline-comment-store';


@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [
    TimelineCommentsService,
  ],
})
export class TimelineComponent implements OnDestroy {

  trackByFn(_: number, item: KeyValue<Frame | string, ImageData>) {
    return item.value;
  }

  private subscription = new Subscription();

  constructor(
    @Inject(TimelineCommentsService) readonly timelineComments: TimelineCommentsService,
    @Inject(LayersStore) store: LayersStore,
  ) {
    this.subscription.add(
      timelineComments.move$.pipe(
        withLatestFrom(store.currentLayer$),
        map(([_, data]) => data),
      ).subscribe((sequence) => {
        store.layer.set(sequence);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
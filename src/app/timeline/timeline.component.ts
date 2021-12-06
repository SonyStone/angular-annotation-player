import { KeyValue } from '@angular/common';
import { Component, Inject, OnDestroy } from '@angular/core';
import { map, Subscription, withLatestFrom } from 'rxjs';

import { CommentsService } from '../comments/comments.service';
import { Frame } from '../interfaces/Frame';
import { TimelineCommentsService } from './timeline-comment-store';


@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [
    TimelineCommentsService,
  ],
})
export class TimelineComponent implements OnDestroy {

  trackByFn(_: number, item: KeyValue<Frame, ImageData>) {
    return item.value;
  }

  private subscription = new Subscription();

  constructor(
    @Inject(TimelineCommentsService) readonly timelineComments: TimelineCommentsService,
    @Inject(CommentsService) private readonly comments: CommentsService,
  ) {
    this.subscription.add(
      timelineComments.move$.pipe(
        withLatestFrom(timelineComments.store$),
        map(([_, data]) => data),
      ).subscribe((data) => {
        this.comments.move$.next(data);
      })
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
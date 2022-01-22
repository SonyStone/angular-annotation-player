import { KeyValue } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnDestroy } from '@angular/core';
import { map, merge, Observable, ReplaySubject, Subscription } from 'rxjs';
import { store } from 'src/app/utilities/store';
import { VideoCurrentFrame } from 'src/app/utilities/video/video-current-frame';

import { Frame } from '../../interfaces/Frame';
import { Annotations } from '../../utilities/layers.store';
import { Keyframes } from './keyframes';
import { SliderDrag } from './slider-drag';
import { SliderTime } from './slider-time';
import { SliderTransform } from './slider-transform';
import { SVGPath, SVGTexts, SVGTimeline } from './svg-timeline';
import { ThumbTranslate } from './thumb';
import { TimelineSize } from './timeline-size';
import { TimelineWidth } from './timeline-width';

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  providers: [
    [
      TimelineSize,
      TimelineWidth,
    ],
    [
      SliderDrag,
      SliderTime,
      SliderTransform,
    ],
    [
      SVGPath,
      SVGTexts,
      SVGTimeline,
    ],
    [
      ThumbTranslate,
      Keyframes,
    ],
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimelineComponent implements OnDestroy {

  trackByFn(_: number, item: KeyValue<Frame | string, ImageData>) {
    return item.value;
  }


  move$ = new ReplaySubject<[Frame, Frame]>();
  // store$ = timelineCommentStore(this.store.currentLayer$, this.move$);
  // keyframes$ = this.store.entities$.pipe(
  //   tap((v) => { console.log(`log-name`, v); }),
  // );

  private subscription = new Subscription();

  constructor(
    @Inject(SliderTime) readonly time$: SliderTime,
    @Inject(TimelineWidth) readonly width$: TimelineWidth,
    @Inject(SliderDrag) readonly slider: SliderDrag,
    @Inject(SliderTransform) readonly translate$: SliderTransform,
    @Inject(ThumbTranslate) readonly thumb$: ThumbTranslate,
    @Inject(SVGPath) readonly svgPath$: SVGPath,
    @Inject(SVGTexts) readonly svgTexts$: SVGTexts,
    @Inject(Keyframes) readonly keyframes$: Keyframes,
    @Inject(Annotations) private readonly store: Annotations,
    @Inject(VideoCurrentFrame) readonly frame$: VideoCurrentFrame,
  ) {
    this.subscription.add(time$.subscribe((time) => store.setTime(time)));

    // this.subscription.add(
    //   timelineComments.move$.pipe(
    //     withLatestFrom(store.currentLayer$),
    //     map(([_, data]) => data),
    //   ).subscribe((sequence) => {
    //     store.layer.set(sequence);
    //   })
    // )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

export const timelineCommentStore = (
  store$: Observable<{ [key: Frame]: ImageData}>,
  lastMove: Observable<[Frame, Frame]>,
) => store<{ [key: Frame]: ImageData}>(
  merge(
    store$.pipe(
      map((frames) => () => ({ ...frames })),
    ),
    lastMove.pipe(
      map(([oldFrame, newFrame]) => (store: { [key: Frame]: ImageData}) => {

        const value = store[oldFrame]!;
        delete store[oldFrame];

        store[newFrame] = value;
  
        return store;
      }),
    )
  ),
  {},
);

import { Directive, Inject, Input, OnDestroy, Output } from '@angular/core';
import { connectable } from 'rxjs';
import { Frame } from 'src/app/interfaces/Frame';

import { Keyframe, Position } from './keyframe';


@Directive({
  selector: '[frame]',
  exportAs: 'frame',
  providers: [
    Position,
    Keyframe,
  ],
})
export class FrameDirective implements OnDestroy {

  @Input('frame') set frame(value: Frame) {
    this.keyframe$.next(value);
  }
  @Output() frameChange = connectable(this.keyframe$.asObservable())

  private subscription = this.frameChange.connect();

  constructor(
    @Inject(Keyframe) readonly keyframe$: Keyframe,
    @Inject(Position) readonly position$: Position,
  ) {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

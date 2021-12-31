import { Inject, Injectable } from '@angular/core';
import { mapTo, merge, Observable, ReplaySubject, Subject } from 'rxjs';

import { Frame } from '../interfaces/Frame';
import { BrushService } from './brush.service';
import { KeyCode } from './keycodes';
import { KeyboardService } from './keyboard.service';

@Injectable()
export class ControlsService {

  play(): void { this.playChange.next(); }
  private readonly playChange = new Subject<void>();
  readonly play$ = merge(
    this.playChange,
    this.keyboard.shortcut(KeyCode.KeyP),
  );

  pause(): void { this.pauseChange.next(); }
  private readonly pauseChange = new Subject<void>();
  readonly pause$ = this.pauseChange.asObservable();

  readonly frameByFrameForwardElement = new ReplaySubject<Element>();

  offsetByFrame(frame: Frame): void { this.offsetByFrameChange.next(frame); }
  nextFrame(): void { this.offsetByFrameChange.next(+1 as Frame); }
  previousFrame(): void { this.offsetByFrameChange.next(-1 as Frame); }
  private readonly offsetByFrameChange = new Subject<Frame>();
  readonly offsetByFrame$ = merge(
    this.offsetByFrameChange,
    this.keyboard.shortcut([KeyCode.ArrowRight]).pipe(mapTo(1)) as Observable<Frame>,
    this.keyboard.shortcut([KeyCode.ArrowLeft]).pipe(mapTo(-1)) as Observable<Frame>,
  );

  nextComment(): void { this.nextCommentChange.next(); }
  private readonly nextCommentChange = new Subject<void>();
  readonly nextComment$ = this.nextCommentChange;

  previousComment(): void { this.previousCommentChange.next(); }
  private readonly previousCommentChange = new Subject<void>();
  readonly previousComment$ = this.previousCommentChange;
  
  forward(pointerevent: PointerEvent): void { this.frameByFrameForward.next(pointerevent) }
  private readonly frameByFrameForward = new Subject<PointerEvent>();
  readonly forward$ = this.frameByFrameForward;

  rewind(pointerevent: PointerEvent): void { this.frameByFrameForward.next(pointerevent) }
  private readonly frameByFrameRewind = new Subject<PointerEvent>();
  readonly rewind$ = this.frameByFrameRewind;

  undo(): void { this.undoChange.next(); }
  private readonly undoChange = new Subject<void>();
  readonly undo$ = merge(
    this.keyboard.shortcut([KeyCode.ControlLeft, KeyCode.KeyZ]),
    this.keyboard.shortcut([KeyCode.ControlRight, KeyCode.KeyZ])
  )

  redo(): void { this.redoChange.next(); }
  private readonly redoChange = new Subject<void>();
  readonly redo$ = merge(
    this.keyboard.shortcut([KeyCode.ControlLeft, KeyCode.KeyY]),
    this.keyboard.shortcut([KeyCode.ControlRight, KeyCode.KeyY])
  )

  pen(): void { this.brush.compositeOperation$.next('source-over') }
  eraser(): void { this.brush.compositeOperation$.next('destination-out') }

  // todo манипуляции с canvas?



  constructor(
    @Inject(KeyboardService) private readonly keyboard: KeyboardService,
    @Inject(BrushService) readonly brush: BrushService,
  ) {}
}
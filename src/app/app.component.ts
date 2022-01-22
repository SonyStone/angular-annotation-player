import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Eraser } from './utilities/actions/eraser';
import { Forward } from './utilities/actions/forward';
import { NextComment } from './utilities/actions/next-comment';
import { NextFrame } from './utilities/actions/next-frame';
import { OffsetByFrame } from './utilities/actions/offset-by-frame';
import { Pause } from './utilities/actions/pause';
import { Pen } from './utilities/actions/pen';
import { Play } from './utilities/actions/play';
import { PreviousComment } from './utilities/actions/previous-comment';
import { PreviousFrame } from './utilities/actions/previous-frame';
import { Redo } from './utilities/actions/redo';
import { Rewind } from './utilities/actions/rewind';
import { Undo } from './utilities/actions/undo';
import { AnnotationsService } from './utilities/annotations.service';
import { AppStore } from './utilities/app.store';
import { BrushColor } from './utilities/brush/brush-color';
import { BrushSize } from './utilities/brush/brush-size';
import { CompositeOperation } from './utilities/brush/compositeOperation';
import { CanvasContext } from './utilities/canvas/canvas-context';
import { CanvasElement } from './utilities/canvas/canvas-element';
import { CanvasPaint } from './utilities/canvas/canvas-paint';
import { CommentFile, FileChange, VideoFile } from './utilities/files-change';
import { KeyboardService } from './utilities/keyboard.service';
import { Annotations } from './utilities/layers.store';
import { VideoCurrentFrame } from './utilities/video/video-current-frame';
import { VideoCurrentTime } from './utilities/video/video-current-time';
import { VideoDimensions } from './utilities/video/video-dimensions';
import { VideoDuration } from './utilities/video/video-duration';
import { VideoElement } from './utilities/video/video-element';
import { VideoFPS } from './utilities/video/video-fps';
import { VideoFrameSize } from './utilities/video/video-frame-size';
import { VideoIsPlaying } from './utilities/video/video-is-playing';
import { VideoSrc } from './utilities/video/video-src';
import { VideoTotalFrames } from './utilities/video/video-total-frames';


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    AppStore,
    [
      FileChange,
      VideoFile,
      CommentFile,
      VideoSrc,
      VideoElement,
      VideoFPS,
      VideoFrameSize,
      VideoDuration,
      VideoCurrentTime,
      VideoCurrentFrame,
      VideoTotalFrames,
      VideoIsPlaying,
      VideoDimensions,
    ],
    [
      Play,
      Pause,
      Undo,
      Redo,
      Forward,
      Rewind,
      PreviousComment,
      NextComment,
      Pen,
      Eraser,
      OffsetByFrame,
      NextFrame,
      PreviousFrame,
    ],
    [
      CanvasElement,
      CanvasContext,
      CanvasPaint,
    ],
    [
      BrushSize,
      BrushColor,
      CompositeOperation
    ],
    AnnotationsService,
    Annotations,
    KeyboardService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnDestroy {

  private readonly subscription = new Subscription();

  constructor(
    @Inject(AnnotationsService) readonly annotations: AnnotationsService,
    @Inject(FileChange) readonly filesInput: FileChange,
    @Inject(ElementRef) readonly elementRef: ElementRef<Element>,
    @Inject(AppStore) store: AppStore,
    @Inject(VideoFPS) readonly fps$: VideoFPS,
    @Inject(VideoCurrentTime) readonly currentTime$: VideoCurrentTime,
    @Inject(VideoCurrentFrame) readonly currentFrame$: VideoCurrentFrame,
    @Inject(VideoTotalFrames) readonly totalFrames$: VideoTotalFrames,
    @Inject(VideoIsPlaying) readonly isPlaying$: VideoIsPlaying,
    @Inject(Play) readonly play: Play,
    @Inject(Pause) readonly pause: Pause,
    @Inject(Undo) readonly undo: Undo,
    @Inject(Redo) readonly redo: Redo,
    @Inject(Forward) readonly forward: Forward,
    @Inject(Rewind) readonly rewind: Rewind,
    @Inject(PreviousComment) readonly previousComment: PreviousComment,
    @Inject(NextComment) readonly nextComment: NextComment,
    @Inject(Pen) readonly pen: Pen,
    @Inject(Eraser) readonly eraser: Eraser,
    @Inject(NextFrame) readonly nextFrame: NextFrame,
    @Inject(PreviousFrame) readonly previousFrame: PreviousFrame,
  ) {
    // this.subscription.add(controls.undo$.subscribe(() => {
    //   history.undo();
    // }));

    // this.subscription.add(controls.redo$.subscribe(() => {
    //   history.redo();
    // }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { ChangeDetectionStrategy, Component, ElementRef, Inject, OnDestroy } from '@angular/core';
import { merge, Subscription } from 'rxjs';

import { BrushColor } from './utilities/brush/brush-color';
import { BrushSize } from './utilities/brush/brush-size';
import { CompositeOperation } from './utilities/brush/compositeOperation';
import { CanvasContext } from './utilities/canvas/canvas-context';
import { CanvasElement } from './utilities/canvas/canvas-element';
import { CurrentImage } from './utilities/canvas/current-image';
import { CommentFile, FileChange, VideoFile } from './utilities/files-change';
import { KeyboardService } from './utilities/keyboard.service';
import { KeyCode } from './utilities/keycodes';
import { AppHistory } from './utilities/store/app.history';
import { AppStore } from './utilities/store/app.store';
import { CommentRestore } from './utilities/store/comment-restore';
import { FileHandler } from './utilities/store/file-handler';
import { Annotations, CurrentAnnotation } from './utilities/store/layers.store';
import { SaveFile } from './utilities/store/save-file';
import { VideoCurrentFrame } from './utilities/video/video-current-frame';
import { VideoDimensions } from './utilities/video/video-dimensions';
import { VideoElement } from './utilities/video/video-element';
import { VideoFPS } from './utilities/video/video-fps';
import { VideoFrameSize } from './utilities/video/video-frame-size';
import { VideoIsPlaying } from './utilities/video/video-is-playing';
import { VideoSrc } from './utilities/video/video-src';
import { VideoTotalFrames } from './utilities/video/video-total-frames';


@Component({
  selector: 'annotation-player',
  templateUrl: './annotation-player.component.html',
  styleUrls: ['./annotation-player.component.scss'],
  providers: [
    [
      AppStore,
      AppHistory,
    ],
    [
      FileChange,
      VideoFile,
      CommentFile,
      VideoSrc,
      VideoElement,
      VideoFPS,
      VideoFrameSize,
      VideoCurrentFrame,
      VideoTotalFrames,
      VideoIsPlaying,
      VideoDimensions,
    ],
    [
      CanvasElement,
      CanvasContext,
    ],
    [
      BrushSize,
      BrushColor,
      CompositeOperation
    ],
    [
      FileHandler,
      CommentRestore,
      CurrentImage,
      SaveFile,
    ],
    [
      Annotations,
      CurrentAnnotation,
    ],
    KeyboardService,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationPlayerComponent implements OnDestroy {

  private readonly subscription = new Subscription();

  constructor(
    @Inject(SaveFile) readonly saveFile$: SaveFile,
    @Inject(FileChange) readonly filesInput: FileChange,
    @Inject(ElementRef) readonly elementRef: ElementRef<Element>,
    @Inject(VideoFrameSize) readonly frameSize$: VideoFrameSize,
    @Inject(VideoCurrentFrame) readonly currentFrame$: VideoCurrentFrame,
    @Inject(VideoTotalFrames) readonly totalFrames$: VideoTotalFrames,
    @Inject(VideoIsPlaying) readonly isPlaying$: VideoIsPlaying,
    @Inject(CompositeOperation) readonly composite: CompositeOperation,
    @Inject(KeyboardService) keyboard: KeyboardService,
    @Inject(CurrentImage) currentImage$: CurrentImage,
    @Inject(AppHistory) readonly history: AppHistory,
    @Inject(Annotations) readonly annotations$: Annotations,
    @Inject(CurrentAnnotation) readonly currentAnnotation$: CurrentAnnotation,
  ) {
    [
      merge(
        keyboard.shortcut([KeyCode.ControlLeft, KeyCode.KeyZ]),
        keyboard.shortcut([KeyCode.ControlRight, KeyCode.KeyZ])
      ).subscribe(() => {
        history.undo();
      }),
      merge(
        keyboard.shortcut([KeyCode.ControlLeft, KeyCode.KeyY]),
        keyboard.shortcut([KeyCode.ControlRight, KeyCode.KeyY])
      ).subscribe(() => {
        history.redo();
      }),
      merge(
        keyboard.shortcut(KeyCode.KeyP),
        keyboard.shortcut(KeyCode.Space),
      ).subscribe(() => {
        isPlaying$.toggle();
      }),
      keyboard.shortcut([KeyCode.ArrowRight]).subscribe(() => {
        currentFrame$.nextFrame();
      }),
      keyboard.shortcut([KeyCode.ArrowLeft]).subscribe(() => {
        currentFrame$.previousFrame();
      }),
      currentFrame$.subscribe(() => {
        currentImage$.clear();
      }),
      currentImage$.subscribe(),
    ].forEach((subscription) => this.subscription.add(subscription))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

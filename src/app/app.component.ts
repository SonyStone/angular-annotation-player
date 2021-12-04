import { DOCUMENT } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { combineLatest, distinctUntilChanged, merge, Observable, of, Subject } from 'rxjs';
import {
  filter,
  map,
  shareReplay,
  startWith,
  switchMap,
withLatestFrom,
} from 'rxjs/operators';
import { Player } from './video/Player';
import { CanvasContext2dDirective } from './canvas-2d.directive';
import { Canvas } from './canvas/Canvas';
import { closest } from './canvas/closest';
import { paint } from './canvas/paint';
import { imageDataStore } from './canvas/imageDataStore';
import { FileHandler } from './canvas/FileHandler';
import { VideoDirective } from './video/video.directive';


const FRAME_RATES = [
  { name: 'film: 24', value: 24 },
  { name: 'NTSC: 29.97', value: 29.97 },
  { name: 'NTSC_Film: 23.976', value: 23.976 },
  { name: 'NTSC_HD: 59.94', value: 59.94 },
  { name: 'PAL: 25', value: 25 },
  { name: 'PAL_HD: 50', value: 50 },
  { name: 'web: 30', value: 30 },
  { name: 'high: 60', value: 60 },
];

const DEFAULT_COLOR = '#ffffff';
const DEFAULT_FRAME_RATE = 29.97;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  frameRates = FRAME_RATES;

  @ViewChild(VideoDirective, { static: true }) video!: VideoDirective;
  @ViewChild('timeline', { static: true }) timeline!: ElementRef<SVGGraphicsElement>;
  @ViewChild('slider', { static: true }) slider!: ElementRef<SVGGElement>;
  @ViewChild(CanvasContext2dDirective, { static: true }) canvas!: CanvasContext2dDirective;


  color = new FormControl(DEFAULT_COLOR);
  color$: Observable<string> = this.color.valueChanges.pipe(
    startWith(this.color.value),
    shareReplay()
  );

  fps = new FormControl(DEFAULT_FRAME_RATE);
  fps$: Observable<number> = this.fps.valueChanges.pipe(
    startWith(this.fps.value),
    filter((fps) => fps > 0 && fps < 9000),
    shareReplay(),
  );

  videoInput$ = new Subject<File>();
  src$ = this.videoInput$.pipe(
    map((file) => URL.createObjectURL(file)),
    map((src) => this.sanitizer.bypassSecurityTrustUrl(src) as string),
    startWith('https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv'),
    // startWith('https://mdn.github.io/learning-area/javascript/apis/video-audio/finished/video/sintel-short.mp4')
  )

  player!: Player;
  frames$!: Observable<[string, ImageData][]>
  file$!: Observable<File>;
  image$!: Observable<ImageData>;

  save$ = new Subject<void>();
  restore$ = new Subject<File>();
  clear$ = new Subject<void>();
  remove$ = new Subject<number>();

  constructor(
    private readonly sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private readonly document: Document
  ) {}

  ngOnInit(): void {

    this.player = new Player(
      of(this.slider.nativeElement),
      of(this.timeline.nativeElement),
      this.video,
      of(this.document.body),
      this.fps$,
    );

    const canvas = this.canvas.canvas;
    const ctx = this.canvas.ctx;

    const offscreenCanvas = new Canvas(canvas.offsetWidth, canvas.offsetHeight);

    const paint$ = merge(
      this.color$.pipe(
        switchMap((color) => paint(canvas, ctx, color)),
        map(() => ctx.getImageData(0, 0, canvas.width, canvas.height)),
      ),
      this.clear$.pipe(map(() => offscreenCanvas.empty)),
    )

    const fileHandler = new FileHandler(offscreenCanvas);

    const store$ = imageDataStore(
      this.restore$.pipe(
        switchMap((file) => fileHandler.restore(file)),
      ),
      paint$.pipe(
        withLatestFrom(this.player.frame$),
      ),
      this.remove$,
    );

    this.frames$ = store$.pipe(
      map((obj) => Object.entries(obj)),
    )

    this.image$ = combineLatest([
      this.player.frame$,
      store$,
    ]).pipe(
      map(([frame, data])=> closest(frame, data) ?? offscreenCanvas.empty),
      distinctUntilChanged(),
      shareReplay(),
    ) 

    this.file$ = this.save$.pipe(
      withLatestFrom(store$),
      switchMap(([_, data]) => fileHandler.save(data)),
      shareReplay(),
    );
  }

  event(event: any): void {
    console.log(`event!`, event);
  }

}

"use strict";
(self["webpackChunkdemo"] = self["webpackChunkdemo"] || []).push([["main"],{

/***/ 2050:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FrameRateService": () => (/* binding */ FrameRateService),
/* harmony export */   "AppComponent": () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _D_1D_Angular_angular_pen_drawing_player_node_modules_ngtools_webpack_src_loaders_direct_resource_js_app_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./app.component.html */ 5158);
/* harmony import */ var _app_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.component.scss */ 836);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 1569);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 4575);
/* harmony import */ var _brush_brush_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./brush/brush.service */ 2824);
/* harmony import */ var _canvas_canvas_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./canvas/canvas.service */ 3380);
/* harmony import */ var _comments_comments_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./comments/comments.service */ 1767);
/* harmony import */ var _files_change__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./files-change */ 5079);
/* harmony import */ var _video_video_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./video/video.service */ 532);











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
let FrameRateService = class FrameRateService {
    constructor(video) {
        this.video = video;
        this.control = new _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormControl(this.video.fps$.value);
        this.subscription = this.control.valueChanges.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.filter)((fps) => fps > 0 && fps < 9000)).subscribe((fps) => {
            this.video.fps$.next(fps);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
FrameRateService.ctorParameters = () => [
    { type: _video_video_service__WEBPACK_IMPORTED_MODULE_6__.VideoService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Inject, args: [_video_video_service__WEBPACK_IMPORTED_MODULE_6__.VideoService,] }] }
];
FrameRateService = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injectable)()
], FrameRateService);

let AppComponent = class AppComponent {
    constructor(frameRate, brush, comments, video, filesInput) {
        this.frameRate = frameRate;
        this.brush = brush;
        this.comments = comments;
        this.video = video;
        this.filesInput = filesInput;
        this.frameRates = FRAME_RATES;
        this.videoInput$ = this.video.video$;
        this.src$ = this.video.src$;
        this.fps$ = this.video.fps$;
        this.currentFrame$ = this.video.currentFrame$;
        this.currentTime$ = this.video.currentTime$;
        this.totalFrames$ = this.video.totalFrames$;
    }
};
AppComponent.ctorParameters = () => [
    { type: FrameRateService },
    { type: _brush_brush_service__WEBPACK_IMPORTED_MODULE_2__.BrushService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Inject, args: [_brush_brush_service__WEBPACK_IMPORTED_MODULE_2__.BrushService,] }] },
    { type: _comments_comments_service__WEBPACK_IMPORTED_MODULE_4__.CommentsService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Inject, args: [_comments_comments_service__WEBPACK_IMPORTED_MODULE_4__.CommentsService,] }] },
    { type: _video_video_service__WEBPACK_IMPORTED_MODULE_6__.VideoService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Inject, args: [_video_video_service__WEBPACK_IMPORTED_MODULE_6__.VideoService,] }] },
    { type: rxjs__WEBPACK_IMPORTED_MODULE_11__.Subject, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Inject, args: [_files_change__WEBPACK_IMPORTED_MODULE_5__.FILES_CHANGE,] }] }
];
AppComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'my-app',
        template: _D_1D_Angular_angular_pen_drawing_player_node_modules_ngtools_webpack_src_loaders_direct_resource_js_app_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        providers: [
            _video_video_service__WEBPACK_IMPORTED_MODULE_6__.VideoService,
            _comments_comments_service__WEBPACK_IMPORTED_MODULE_4__.CommentsService,
            _canvas_canvas_service__WEBPACK_IMPORTED_MODULE_3__.CanvasService,
            _brush_brush_service__WEBPACK_IMPORTED_MODULE_2__.BrushService,
            FrameRateService,
        ],
        styles: [_app_component_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], AppComponent);



/***/ }),

/***/ 4750:
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppModule": () => (/* binding */ AppModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.component */ 2050);
/* harmony import */ var _canvas_canvas_paint_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas/canvas-paint.directive */ 1544);
/* harmony import */ var _color_selector_color_selector_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./color-selector/color-selector.component */ 2387);
/* harmony import */ var _common_common_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./common/common.module */ 2326);
/* harmony import */ var _file_download_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./file-download.directive */ 7639);
/* harmony import */ var _file_drop_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./file-drop.directive */ 5174);
/* harmony import */ var _frame_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./frame.pipe */ 2434);
/* harmony import */ var _timecode_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./timecode.pipe */ 6804);
/* harmony import */ var _timeline_timeline_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./timeline/timeline.module */ 3091);
/* harmony import */ var _video_video_scroll_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./video/video-scroll.directive */ 8537);
/* harmony import */ var _video_video_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./video/video.directive */ 6191);















let AppModule = class AppModule {
};
AppModule = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.NgModule)({
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_13__.BrowserModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_14__.ReactiveFormsModule,
            [
                _timeline_timeline_module__WEBPACK_IMPORTED_MODULE_8__.TimelineModule,
                _common_common_module__WEBPACK_IMPORTED_MODULE_3__.AppCommonModule,
            ],
        ],
        declarations: [
            _file_drop_directive__WEBPACK_IMPORTED_MODULE_5__.FileDropDirective,
            _app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
            _canvas_canvas_paint_directive__WEBPACK_IMPORTED_MODULE_1__.CanvasPaintDirective,
            _file_download_directive__WEBPACK_IMPORTED_MODULE_4__.FileDownloadDirective,
            _video_video_directive__WEBPACK_IMPORTED_MODULE_10__.VideoDirective,
            [
                _timecode_pipe__WEBPACK_IMPORTED_MODULE_7__.TimecodePipe,
                _frame_pipe__WEBPACK_IMPORTED_MODULE_6__.FramePipe,
            ],
            [
                _color_selector_color_selector_component__WEBPACK_IMPORTED_MODULE_2__.ColorSelectorComponent,
                _video_video_scroll_directive__WEBPACK_IMPORTED_MODULE_9__.ScrollDirective,
            ],
        ],
        bootstrap: [
            _app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent,
        ]
    })
], AppModule);



/***/ }),

/***/ 2824:
/*!****************************************!*\
  !*** ./src/app/brush/brush.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_BRUSH_COLOR": () => (/* binding */ DEFAULT_BRUSH_COLOR),
/* harmony export */   "BrushService": () => (/* binding */ BrushService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 8824);



const DEFAULT_BRUSH_COLOR = '#ffffff';
const COMPOSITE_OPERATIONS = [
    'source-over',
    // 'source-in',
    // 'source-out',
    'source-atop',
    'destination-over',
    // 'destination-in',
    'destination-out',
    // 'destination-atop',
    'lighter',
    // 'copy',
    // 'xor',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'hard-light',
    'soft-light',
    // 'difference',
    'exclusion',
    'hue',
    'saturation',
    'color',
    'luminosity',
];
let BrushService = class BrushService {
    constructor() {
        this.color$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(DEFAULT_BRUSH_COLOR);
        this.size$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(20);
        this.compositeOperations = COMPOSITE_OPERATIONS.map((value) => ({ name: value, value }));
        this.compositeOperation$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__.BehaviorSubject(COMPOSITE_OPERATIONS[0]);
    }
};
BrushService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()
], BrushService);



/***/ }),

/***/ 8282:
/*!*******************************************!*\
  !*** ./src/app/canvas/CanvasOffscreen.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasOffscreen": () => (/* binding */ CanvasOffscreen)
/* harmony export */ });
class CanvasOffscreen {
    constructor(w, h) {
        this.w = w;
        this.h = h;
        this.canvas = new OffscreenCanvas(this.w, this.h);
        this.ctx = this.canvas.getContext('2d');
        this.empty = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    }
    imageToImageData(image) {
        this.clear();
        this.drawImage(image);
        const imageData = this.getImageData();
        this.clear();
        return imageData;
    }
    getImageData() {
        return this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    drawImage(image) {
        this.ctx.drawImage(image, 0, 0);
    }
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    imageDataToBlop(imageData) {
        this.ctx.putImageData(imageData, 0, 0);
        const blob = this.canvas[this.canvas.convertToBlob
            ? 'convertToBlob'
            : 'toBlob']();
        return blob;
    }
    ;
}


/***/ }),

/***/ 6858:
/*!***************************************!*\
  !*** ./src/app/canvas/FileHandler.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileHandler": () => (/* binding */ FileHandler)
/* harmony export */ });
/* harmony import */ var D_1D_Angular_angular_pen_drawing_player_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@angular-devkit/build-angular/node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 6675);

class FileHandler {
  constructor(canvas) {
    this.canvas = canvas;
  }

  restore(file) {
    var _this = this;

    return (0,D_1D_Angular_angular_pen_drawing_player_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const reader = new FileReader();
      reader.readAsText(file);
      const str = yield new Promise((resolve, reject) => {
        reader.onload = () => {
          const result = reader.result;
          result ? resolve(result) : reject();
        };
      });
      const entries = Object.entries(JSON.parse(str));
      const dataPromises = entries.map(([key, value]) => {
        const img = new Image();
        img.src = value;
        return new Promise((resolve, reject) => {
          img.onload = () => {
            const imageData = _this.canvas.imageToImageData(img);

            resolve(imageData);
          };
        });
      });
      const data2 = yield Promise.all(dataPromises);
      const filledData = entries.reduce((accumulator, [key, _], index) => {
        accumulator.set(parseInt(key, 10), data2[index]);
        return accumulator;
      }, new Map());
      return filledData;
    })();
  }

  save(data) {
    var _this2 = this;

    return (0,D_1D_Angular_angular_pen_drawing_player_node_modules_angular_devkit_build_angular_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      const base64Images = [];
      const keys = [];

      for (const [key, img] of data) {
        const base64 = _this2.canvas.imageDataToBlop(img).then(blob => blobToBase64(blob));

        base64Images.push(base64);
        keys.push(key);
      }

      const images = yield Promise.all(base64Images);
      const dataImages = images.reduce((accumulator, img, index) => {
        const key = keys[index];
        accumulator[key] = img;
        return accumulator;
      }, {});
      const json = JSON.stringify(dataImages, (key, value) => {
        if (value instanceof ImageData) {
          return data.get(parseInt(key, 10));
        }

        return value;
      });
      const file = new File([json], 'foo.json', {
        type: 'text/json'
      });
      return file;
    })();
  }

}

const blobToBase64 = blob => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      const result = reader.result;
      result ? resolve(result) : reject();
    };
  });
};

/***/ }),

/***/ 1544:
/*!**************************************************!*\
  !*** ./src/app/canvas/canvas-paint.directive.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasPaintDirective": () => (/* binding */ CanvasPaintDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 1620);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 3927);
/* harmony import */ var _comments_comments_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../comments/comments.service */ 1767);
/* harmony import */ var _canvas_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas.service */ 3380);





let CanvasPaintDirective = class CanvasPaintDirective {
    constructor(elementRef, canvas, comments) {
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subscription();
        canvas.canvas$.next(elementRef.nativeElement);
        this.subscription.add((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.combineLatest)([canvas.ctx$, comments.currentImage$]).subscribe(([ctx, img]) => {
            if (img) {
                ctx.putImageData(img, 0, 0);
            }
            else {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            }
        }));
        // this.subscription.add(
        //   combineLatest([ctx$, player.clear$]).subscribe(([ctx]) => {
        //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //   })
        // )
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
CanvasPaintDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.ElementRef },
    { type: _canvas_service__WEBPACK_IMPORTED_MODULE_1__.CanvasService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Inject, args: [_canvas_service__WEBPACK_IMPORTED_MODULE_1__.CanvasService,] }] },
    { type: _comments_comments_service__WEBPACK_IMPORTED_MODULE_0__.CommentsService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_4__.Inject, args: [_comments_comments_service__WEBPACK_IMPORTED_MODULE_0__.CommentsService,] }] }
];
CanvasPaintDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Directive)({
        selector: `canvas[paint]`,
    })
], CanvasPaintDirective);



/***/ }),

/***/ 3380:
/*!******************************************!*\
  !*** ./src/app/canvas/canvas.service.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasService": () => (/* binding */ CanvasService),
/* harmony export */   "canvasContext": () => (/* binding */ canvasContext),
/* harmony export */   "canvasPaint": () => (/* binding */ canvasPaint)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 9195);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 2014);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 5309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2909);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 3927);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 2407);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 3014);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 6567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 4000);
/* harmony import */ var _brush_brush_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../brush/brush.service */ 2824);
/* harmony import */ var _croquis_brush_simple__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../croquis/brush/simple */ 3182);
/* harmony import */ var _croquis_stylus__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../croquis/stylus */ 2366);
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../events/pointer */ 718);







let CanvasService = class CanvasService {
    constructor(brush) {
        this.brush = brush;
        this.canvas$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__.ReplaySubject();
        this.ctx$ = canvasContext(this.canvas$);
        this.paint$ = canvasPaint(this.ctx$, this.brush.color$, this.brush.size$, this.brush.compositeOperation$);
    }
};
CanvasService.ctorParameters = () => [
    { type: _brush_brush_service__WEBPACK_IMPORTED_MODULE_0__.BrushService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Inject, args: [_brush_brush_service__WEBPACK_IMPORTED_MODULE_0__.BrushService,] }] }
];
CanvasService = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)()
], CanvasService);

function canvasContext(canvas$) {
    return canvas$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.map)((canvas) => {
        canvas.height = canvas.offsetHeight;
        canvas.width = canvas.offsetWidth;
        return canvas.getContext('2d');
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.tap)((e) => {
        console.log(`canvas`, e);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.shareReplay)());
}
function canvasPaint(ctx$, color$, size$, globalCompositeOperation$) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.combineLatest)([ctx$, color$, size$, globalCompositeOperation$]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.switchMap)(([ctx, color, size, globalCompositeOperation]) => {
        const down = (0,_events_pointer__WEBPACK_IMPORTED_MODULE_3__.pointerdown)(ctx.canvas);
        const move = (0,_events_pointer__WEBPACK_IMPORTED_MODULE_3__.pointermove)(ctx.canvas);
        const up = (0,_events_pointer__WEBPACK_IMPORTED_MODULE_3__.pointerup)(ctx.canvas);
        return down.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.map)((event) => _croquis_brush_simple__WEBPACK_IMPORTED_MODULE_1__.stroke.down({
            ctx,
            color,
            size,
            globalCompositeOperation,
        }, (0,_croquis_stylus__WEBPACK_IMPORTED_MODULE_2__.getStylusState)(event))), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.exhaustMap)((drawingContext) => move.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.map)((event) => drawingContext.move((0,_croquis_stylus__WEBPACK_IMPORTED_MODULE_2__.getStylusState)(event))), (0,rxjs__WEBPACK_IMPORTED_MODULE_13__.takeUntil)(up.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.map)((event) => drawingContext.up((0,_croquis_stylus__WEBPACK_IMPORTED_MODULE_2__.getStylusState)(event))))), (0,rxjs__WEBPACK_IMPORTED_MODULE_14__.last)(), (0,rxjs__WEBPACK_IMPORTED_MODULE_7__.map)(() => ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)))));
    }));
}


/***/ }),

/***/ 5523:
/*!*********************************!*\
  !*** ./src/app/canvas/store.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "store": () => (/* binding */ store)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 1481);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 2909);


const store = (actions$, init = {}) => actions$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.scan)((accumulator, fn) => fn(accumulator), init), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.shareReplay)());


/***/ }),

/***/ 8237:
/*!********************************************!*\
  !*** ./src/app/coerce-boolean-property.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "coerceBooleanProperty": () => (/* binding */ coerceBooleanProperty)
/* harmony export */ });
function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}


/***/ }),

/***/ 2387:
/*!************************************************************!*\
  !*** ./src/app/color-selector/color-selector.component.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ColorSelectorComponent": () => (/* binding */ ColorSelectorComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _brush_brush_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../brush/brush.service */ 2824);



let ColorSelectorComponent = class ColorSelectorComponent {
    constructor(brush) {
        this.brush = brush;
    }
};
ColorSelectorComponent.ctorParameters = () => [
    { type: _brush_brush_service__WEBPACK_IMPORTED_MODULE_0__.BrushService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject, args: [_brush_brush_service__WEBPACK_IMPORTED_MODULE_0__.BrushService,] }] }
];
ColorSelectorComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Component)({
        selector: 'color-selector',
        template: `
  
  <input type="color"
       [ngModel]="brush.color$ | push"
       (ngModelChange)="brush.color$.next($event)">
  
  `,
    })
], ColorSelectorComponent);



/***/ }),

/***/ 1767:
/*!**********************************************!*\
  !*** ./src/app/comments/comments.service.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommentsService": () => (/* binding */ CommentsService),
/* harmony export */   "commentStore": () => (/* binding */ commentStore),
/* harmony export */   "commentSaveFile": () => (/* binding */ commentSaveFile),
/* harmony export */   "commentCurrentImage": () => (/* binding */ commentCurrentImage),
/* harmony export */   "commentFileChange": () => (/* binding */ commentFileChange),
/* harmony export */   "commentRestore": () => (/* binding */ commentRestore),
/* harmony export */   "fileHandler": () => (/* binding */ fileHandler)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9195);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 4575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 4932);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 2014);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 8177);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 5309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 2909);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 2407);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 3927);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 1569);
/* harmony import */ var _canvas_canvas_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas/canvas.service */ 3380);
/* harmony import */ var _canvas_CanvasOffscreen__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../canvas/CanvasOffscreen */ 8282);
/* harmony import */ var _canvas_FileHandler__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../canvas/FileHandler */ 6858);
/* harmony import */ var _canvas_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../canvas/store */ 5523);
/* harmony import */ var _files_change__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../files-change */ 5079);
/* harmony import */ var _video_video_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../video/video.service */ 532);









let CommentsService = class CommentsService {
    constructor(files$, canvas, video) {
        this.files$ = files$;
        this.canvas = canvas;
        this.video = video;
        this.add$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.ReplaySubject();
        this.fileHandler$ = fileHandler(this.canvas.ctx$);
        this.restore$ = commentRestore(commentFileChange(this.files$), this.fileHandler$);
        this.move$ = new rxjs__WEBPACK_IMPORTED_MODULE_6__.ReplaySubject();
        this.remove$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
        this.store$ = commentStore(this.move$, this.restore$, this.canvas.paint$, this.video.currentFrame$, this.remove$);
        this.currentImage$ = commentCurrentImage(this.video.currentFrame$, this.store$);
        this.save$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subject();
        this.file$ = commentSaveFile(this.save$, this.store$, this.fileHandler$);
    }
};
CommentsService.ctorParameters = () => [
    { type: rxjs__WEBPACK_IMPORTED_MODULE_8__.Observable, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Inject, args: [_files_change__WEBPACK_IMPORTED_MODULE_4__.FILES_CHANGE,] }] },
    { type: _canvas_canvas_service__WEBPACK_IMPORTED_MODULE_0__.CanvasService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Inject, args: [_canvas_canvas_service__WEBPACK_IMPORTED_MODULE_0__.CanvasService,] }] },
    { type: _video_video_service__WEBPACK_IMPORTED_MODULE_5__.VideoService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.Inject, args: [_video_video_service__WEBPACK_IMPORTED_MODULE_5__.VideoService,] }] }
];
CommentsService = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Injectable)()
], CommentsService);

function commentStore(move$, restore$, paint$, currentFrame$, remove$) {
    return (0,_canvas_store__WEBPACK_IMPORTED_MODULE_3__.store)((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.merge)((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.merge)(move$, restore$).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)((data) => () => data)), paint$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.withLatestFrom)(currentFrame$), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)(([imageData, frame]) => (store) => {
        store.set(frame, imageData);
        return store;
    })), remove$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)((frame) => (store) => {
        store.delete(frame);
        return store;
    }))), new Map()).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.tap)((e) => {
        console.log(`store`, e);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.shareReplay)());
}
function commentSaveFile(save$, data$, fileHandler$) {
    return save$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.withLatestFrom)(data$, fileHandler$), (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.switchMap)(([_, data, fileHandler]) => fileHandler.save(data)), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.shareReplay)());
}
function commentCurrentImage(currentFrame$, store$) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.combineLatest)([
        store$,
        currentFrame$,
    ]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)(([data, frame]) => data.get(frame)), 
    // map(([frame, data])=> closest(frame, data) ?? undefined),
    (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.shareReplay)());
}
function commentFileChange(files$) {
    return files$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)((files) => Array.from(files)), (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)((files) => files.find(isJsonFile)), (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.filter)((v) => !!v));
}
function isJsonFile(file) {
    return file.type === 'application/json';
}
function commentRestore(file$, fileHandler$) {
    return file$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.withLatestFrom)(fileHandler$), (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.switchMap)(([file, fileHandler]) => fileHandler.restore(file)), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.shareReplay)());
}
function fileHandler(ctx$) {
    const offscreenCanvas$ = ctx$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)(({ canvas }) => new _canvas_CanvasOffscreen__WEBPACK_IMPORTED_MODULE_1__.CanvasOffscreen(canvas.offsetWidth, canvas.offsetHeight)));
    const fileHandler$ = offscreenCanvas$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_12__.map)((offscreenCanvas) => new _canvas_FileHandler__WEBPACK_IMPORTED_MODULE_2__.FileHandler(offscreenCanvas)), (0,rxjs__WEBPACK_IMPORTED_MODULE_15__.shareReplay)());
    return fileHandler$;
}


/***/ }),

/***/ 2326:
/*!*****************************************!*\
  !*** ./src/app/common/common.module.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppCommonModule": () => (/* binding */ AppCommonModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _file_value_accessor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./file_value_accessor */ 5760);
/* harmony import */ var _push_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./push.pipe */ 1112);




let AppCommonModule = class AppCommonModule {
};
AppCommonModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        declarations: [
            _push_pipe__WEBPACK_IMPORTED_MODULE_1__.PushPipe,
            _file_value_accessor__WEBPACK_IMPORTED_MODULE_0__.FileValueAccessor,
        ],
        exports: [
            _push_pipe__WEBPACK_IMPORTED_MODULE_1__.PushPipe,
            _file_value_accessor__WEBPACK_IMPORTED_MODULE_0__.FileValueAccessor,
        ]
    })
], AppCommonModule);



/***/ }),

/***/ 5760:
/*!***********************************************!*\
  !*** ./src/app/common/file_value_accessor.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileValueAccessor": () => (/* binding */ FileValueAccessor)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 8346);
var FileValueAccessor_1;



let FileValueAccessor = FileValueAccessor_1 = class FileValueAccessor {
    constructor(renderer, elementRef) {
        this.renderer = renderer;
        this.elementRef = elementRef;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    writeValue(value) { }
    registerOnChange(fn) {
        this.onChange = (value) => {
            fn(value);
        };
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setDisabledState(isDisabled) {
        this.setProperty('disabled', isDisabled);
    }
    setProperty(key, value) {
        this.renderer.setProperty(this.elementRef.nativeElement, key, value);
    }
};
FileValueAccessor.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Renderer2 },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef }
];
FileValueAccessor.propDecorators = {
    multiple: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input }]
};
FileValueAccessor = FileValueAccessor_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({
        selector: `input[type=file][formControlName],
             input[type=file][formControl],
             input[type=file][ngModel]`,
        host: {
            '(input)': 'onChange($event.target.files)',
            '(blur)': 'onTouched()'
        },
        providers: [
            {
                provide: _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NG_VALUE_ACCESSOR,
                useExisting: (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => FileValueAccessor_1),
                multi: true
            }
        ]
    })
], FileValueAccessor);



/***/ }),

/***/ 1112:
/*!*************************************!*\
  !*** ./src/app/common/push.pipe.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "invalidPipeArgumentError": () => (/* binding */ invalidPipeArgumentError),
/* harmony export */   "PushPipe": () => (/* binding */ PushPipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
var PushPipe_1;


function invalidPipeArgumentError(type, value) {
  return Error(`InvalidPipeArgument: '${value}' for pipe '${(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵstringify"])(type)}'`);
}

class SubscribableStrategy {
  createSubscription(async, updateLatestValue) {
    return async.subscribe({
      next: updateLatestValue,
      error: e => {
        throw e;
      }
    });
  }

  dispose(subscription) {
    subscription.unsubscribe();
  }

  onDestroy(subscription) {
    subscription.unsubscribe();
  }

}

class PromiseStrategy {
  createSubscription(async, updateLatestValue) {
    return async.then(updateLatestValue, e => {
      throw e;
    });
  }

  dispose(subscription) {}

  onDestroy(subscription) {}

}

const promiseStrategy = new PromiseStrategy();
const subscribableStrategy = new SubscribableStrategy();
/**
 * @ngModule CommonModule
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 * @usageNotes
 *
 * ### Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuously updates the view with the current time.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * @publicApi
 */

let PushPipe = PushPipe_1 = class PushPipe {
  constructor(cd) {
    this.cd = cd;
    this.latestValue = null;
    this.subscription = null;
    this.obj = null;
    this.strategy = null;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.dispose();
    }
  }

  transform(obj) {
    if (!this.obj) {
      if (obj) {
        this.subscribe(obj);
      }

      return this.latestValue;
    }

    if (obj !== this.obj) {
      this.dispose();
      return this.transform(obj);
    }

    return this.latestValue;
  }

  subscribe(obj) {
    this.obj = obj;
    this.strategy = this.selectStrategy(obj);
    this.subscription = this.strategy.createSubscription(obj, value => this.updateLatestValue(obj, value));
  }

  selectStrategy(obj) {
    if ((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵisPromise"])(obj)) {
      return promiseStrategy;
    }

    if ((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵisSubscribable"])(obj)) {
      return subscribableStrategy;
    }

    throw invalidPipeArgumentError(PushPipe_1, obj);
  }

  dispose() {
    this.strategy.dispose(this.subscription);
    this.latestValue = null;
    this.subscription = null;
    this.obj = null;
  }

  updateLatestValue(async, value) {
    if (async === this.obj) {
      this.latestValue = value;
      this.cd.detectChanges(); // markDirty((this.viewContainerRef as any)?._hostView?.[8]);
      // this._ref
    }
  }

};

PushPipe.ctorParameters = () => [{
  type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
}];

PushPipe = PushPipe_1 = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Pipe)({
  name: 'push',
  pure: false
})], PushPipe);


/***/ }),

/***/ 3182:
/*!*****************************************!*\
  !*** ./src/app/croquis/brush/simple.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultBrushConfig": () => (/* binding */ defaultBrushConfig),
/* harmony export */   "stroke": () => (/* binding */ stroke)
/* harmony export */ });
/* harmony import */ var _stylus__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stylus */ 2366);
/* harmony import */ var _misc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../misc */ 3495);


const defaultBrushConfig = Object.freeze({
    ctx: _misc__WEBPACK_IMPORTED_MODULE_1__.dummyCanvasContext,
    color: '#000',
    size: 10,
    globalCompositeOperation: 'source-over',
});
const stroke = {
    resume(config, prevState) {
        return getDrawingContext(stroke, config, prevState);
    },
    down(config, curr) {
        const state = {
            prev: (0,_stylus__WEBPACK_IMPORTED_MODULE_0__.cloneStylusState)(curr),
        };
        const drawingContext = getDrawingContext(stroke, config, state);
        if (curr.pressure <= 0) {
            return drawingContext;
        }
        config.ctx.save();
        config.ctx.globalCompositeOperation = config.globalCompositeOperation;
        config.ctx.fillStyle = config.color;
        drawCircle(config.ctx, stylusStateToCircle(curr, config.size));
        config.ctx.restore();
        return drawingContext;
    },
};
function getDrawingContext(stroke, config, state) {
    return {
        getConfig(target) {
            if (!target || target === stroke)
                return config;
            throw undefined;
        },
        getState(target) {
            if (!target || target === stroke)
                return state;
            throw undefined;
        },
        move(curr) {
            const c1 = stylusStateToCircle(state.prev, config.size);
            const c2 = stylusStateToCircle(curr, config.size);
            config.ctx.save();
            config.ctx.globalCompositeOperation = config.globalCompositeOperation;
            config.ctx.fillStyle = config.color;
            drawCapsule(config.ctx, c1, c2);
            (0,_stylus__WEBPACK_IMPORTED_MODULE_0__.copyStylusState)(state.prev, curr);
            config.ctx.restore();
        },
        up(curr) {
            const c1 = stylusStateToCircle(state.prev, config.size);
            const c2 = stylusStateToCircle(curr, config.size);
            config.ctx.save();
            config.ctx.globalCompositeOperation = config.globalCompositeOperation;
            config.ctx.fillStyle = config.color;
            drawCapsule(config.ctx, c1, c2);
            (0,_stylus__WEBPACK_IMPORTED_MODULE_0__.copyStylusState)(state.prev, curr);
            config.ctx.restore();
            return {
            // boundingRect: state.boundingRect,
            };
        },
    };
}
function stylusStateToCircle(stylusState, size) {
    return { x: stylusState.x, y: stylusState.y, r: stylusState.pressure * size * 0.5 };
}
function drawCapsule(ctx, c1, c2) {
    const c1IsBig = c1.r > c2.r;
    const big = c1IsBig ? c1 : c2;
    const small = c1IsBig ? c2 : c1;
    const d = Math.sqrt((c2.x - c1.x) ** 2 + (c2.y - c1.y) ** 2);
    if (big.r > small.r + d)
        return drawCircle(ctx, big);
    if (big.r === small.r) {
        drawCapsuleCase1(ctx, big, small);
    }
    else {
        drawCapsuleCase2(ctx, big, small);
    }
}
function drawCircle(ctx, circle) {
    ctx.beginPath();
    ctx.moveTo(circle.x + circle.r, circle.y);
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}
const quarter = Math.PI / 2;
function drawCapsuleCase1(ctx, c1, c2) {
    drawCircle(ctx, c1);
    drawCircle(ctx, c2);
    const c = Math.atan2(c2.y - c1.y, c2.x - c1.x);
    const i = c - quarter;
    const j = c + quarter;
    const idx = Math.cos(i) * c2.r;
    const idy = Math.sin(i) * c2.r;
    const jdx = Math.cos(j) * c2.r;
    const jdy = Math.sin(j) * c2.r;
    ctx.beginPath();
    ctx.moveTo(c2.x + idx, c2.y + idy);
    ctx.lineTo(c1.x + idx, c1.y + idy);
    ctx.lineTo(c1.x + jdx, c1.y + jdy);
    ctx.lineTo(c2.x + jdx, c2.y + jdy);
    ctx.closePath();
    ctx.fill();
}
function drawCapsuleCase2(ctx, c1, c2) {
    drawCircle(ctx, c1);
    drawCircle(ctx, c2);
    const x = c2.x - c1.x || 1e-9;
    const y = c2.y - c1.y;
    const r = c1.r - c2.r;
    const r2 = r * r;
    const x2 = x * x;
    const x3 = x * x * x;
    const y2 = y * y;
    const ax = (x === 0 ? c1.r : (y * Math.sqrt(r2 * x2 * (-r2 + x2 + y2)) + r2 * x2) / (x3 + x * y2)) + c1.x;
    const ay = (r2 * y - Math.sqrt(r2 * x2 * (-r2 + x2 + y2))) / (x2 + y2) + c1.y;
    const bx = (x === 0 ? -c1.r : (-(y * Math.sqrt(r2 * x2 * (-r2 + x2 + y2))) + r2 * x2) / (x3 + x * y2)) +
        c1.x;
    const by = (r2 * y + Math.sqrt(r2 * x2 * (-r2 + x2 + y2))) / (x2 + y2) + c1.y;
    const i = Math.atan2(ay - c1.y, ax - c1.x);
    const j = Math.atan2(by - c1.y, bx - c1.x);
    const idx = Math.cos(i) * c2.r;
    const idy = Math.sin(i) * c2.r;
    const jdx = Math.cos(j) * c2.r;
    const jdy = Math.sin(j) * c2.r;
    ctx.beginPath();
    ctx.moveTo(c2.x + idx, c2.y + idy);
    ctx.lineTo(ax + idx, ay + idy);
    ctx.lineTo(bx + jdx, by + jdy);
    ctx.lineTo(c2.x + jdx, c2.y + jdy);
    ctx.closePath();
    ctx.fill();
}


/***/ }),

/***/ 3495:
/*!*********************************!*\
  !*** ./src/app/croquis/misc.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dummyCanvasContext": () => (/* binding */ dummyCanvasContext)
/* harmony export */ });
const noop = (_) => { };
const dummyCanvasContext = {
    canvas: {},
    direction: 'ltr',
    fillStyle: '#000000',
    filter: 'none',
    font: '10px sans-serif',
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    imageSmoothingEnabled: true,
    imageSmoothingQuality: 'low',
    lineCap: 'butt',
    lineDashOffset: 0,
    lineJoin: 'miter',
    lineWidth: 1,
    miterLimit: 10,
    shadowBlur: 0,
    shadowColor: 'rgba(0, 0, 0, 0)',
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    strokeStyle: '#000000',
    textAlign: 'start',
    textBaseline: 'alphabetic',
    save: noop,
    restore: noop,
    scale: noop,
    rotate: noop,
    translate: noop,
    transform: noop,
    setTransform: noop,
    getTransform: () => new DOMMatrix(),
    resetTransform: noop,
    createLinearGradient: () => ({ addColorStop: noop }),
    createRadialGradient: () => ({ addColorStop: noop }),
    createPattern: () => null,
    clearRect: noop,
    fillRect: noop,
    strokeRect: noop,
    beginPath: noop,
    fill: noop,
    stroke: noop,
    drawFocusIfNeeded: noop,
    getContextAttributes: () => ({}),
    clip: noop,
    isPointInPath: () => false,
    isPointInStroke: () => false,
    fillText: noop,
    strokeText: noop,
    measureText: () => ({
        actualBoundingBoxAscent: 0,
        actualBoundingBoxDescent: 0,
        actualBoundingBoxLeft: 0,
        actualBoundingBoxRight: 0,
        alphabeticBaseline: 0,
        emHeightAscent: 0,
        emHeightDescent: 0,
        fontBoundingBoxAscent: 0,
        fontBoundingBoxDescent: 0,
        hangingBaseline: 0,
        ideographicBaseline: 0,
        width: 0,
    }),
    drawImage: noop,
    getImageData: () => new ImageData(1, 1),
    putImageData: noop,
    createImageData: () => new ImageData(1, 1),
    setLineDash: noop,
    getLineDash: () => [],
    closePath: noop,
    moveTo: noop,
    lineTo: noop,
    quadraticCurveTo: noop,
    bezierCurveTo: noop,
    arcTo: noop,
    rect: noop,
    arc: noop,
    ellipse: noop,
};


/***/ }),

/***/ 2366:
/*!***********************************!*\
  !*** ./src/app/croquis/stylus.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStylusState": () => (/* binding */ getStylusState),
/* harmony export */   "createStylusState": () => (/* binding */ createStylusState),
/* harmony export */   "createStylusStates": () => (/* binding */ createStylusStates),
/* harmony export */   "cloneStylusState": () => (/* binding */ cloneStylusState),
/* harmony export */   "copyStylusState": () => (/* binding */ copyStylusState),
/* harmony export */   "interpolateStylusState": () => (/* binding */ interpolateStylusState)
/* harmony export */ });
const getStylusState = (e) => ({
    x: e.offsetX,
    y: e.offsetY,
    pressure: (e.pointerType === 'mouse')
        ? 1
        : e.pressure,
    tangentialPressure: e.tangentialPressure,
    tiltX: e.tiltX,
    tiltY: e.tiltY,
    twist: e.twist,
});
function createStylusState() {
    return {
        x: 0,
        y: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
    };
}
const dummyStylusState = createStylusState();
function createStylusStates(length, prototype = dummyStylusState) {
    return Array.from({ length }, () => cloneStylusState(prototype));
}
function cloneStylusState(stylusState) {
    const { x, y, pressure, tangentialPressure, tiltX, tiltY, twist } = stylusState;
    return { x, y, pressure, tangentialPressure, tiltX, tiltY, twist };
}
function copyStylusState(dst, src) {
    dst.x = src.x;
    dst.y = src.y;
    dst.pressure = src.pressure;
    dst.tangentialPressure = src.tangentialPressure;
    dst.tiltX = src.tiltX;
    dst.tiltY = src.tiltY;
    dst.twist = src.twist;
}
function interpolateStylusState(target, to, t) {
    target.x = lerp(target.x, to.x, t);
    target.y = lerp(target.y, to.y, t);
    target.pressure = lerp(target.pressure, to.pressure, t);
    target.tangentialPressure = lerp(target.tangentialPressure, to.tangentialPressure, t);
    target.tiltX = lerp(target.tiltX, to.tiltX, t);
    target.tiltY = lerp(target.tiltY, to.tiltY, t);
    target.twist = lerpAngle(target.twist, to.twist, t);
}
function lerp(a, b, t) {
    return a + (b - a) * t;
}
function lerpAngle(a, b, t) {
    const c = ((((b - a) % 360) + 540) % 360) - 180;
    return a + ((c * t) % 360);
}


/***/ }),

/***/ 718:
/*!***********************************!*\
  !*** ./src/app/events/pointer.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pointerdown": () => (/* binding */ pointerdown),
/* harmony export */   "pointermove": () => (/* binding */ pointermove),
/* harmony export */   "pointerup": () => (/* binding */ pointerup),
/* harmony export */   "pointerdrag": () => (/* binding */ pointerdrag)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 5309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 5558);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2909);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 4168);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 6567);

const pointerdown = (element) => (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(element, 'pointerdown').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)((evt) => {
    element.setPointerCapture(evt.pointerId);
    evt.preventDefault();
    evt.stopPropagation();
}));
const pointermove = (element) => (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(element, 'pointermove');
const pointerup = (element) => (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(element, 'pointerup'), (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(element, 'pointerleave'), (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(element, 'pointercancel')).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.tap)((evt) => {
    element.releasePointerCapture(evt.pointerId);
}), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.first)());
const pointerdrag = (element) => {
    const down$ = pointerdown(element).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.shareReplay)());
    const move$ = pointermove(element);
    const up$ = pointerup(element);
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.merge)(down$, down$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMapTo)(move$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.takeUntil)(up$)))), up$);
};


/***/ }),

/***/ 7639:
/*!********************************************!*\
  !*** ./src/app/file-download.directive.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileDownloadDirective": () => (/* binding */ FileDownloadDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);



let FileDownloadDirective = class FileDownloadDirective {
    constructor(document) {
        this.document = document;
        this.a = this.document.createElement('a');
    }
    set src(file) {
        if (file) {
            const downloadLink = URL.createObjectURL(file);
            this.a.href = downloadLink;
            this.a.download = 'test.json';
            this.a.click();
        }
    }
    ;
    ngOnDestroy() {
        this.a.remove();
    }
};
FileDownloadDirective.ctorParameters = () => [
    { type: Document, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject, args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT,] }] }
];
FileDownloadDirective.propDecorators = {
    src: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input, args: ['file',] }]
};
FileDownloadDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({
        selector: `[file]`,
    })
], FileDownloadDirective);



/***/ }),

/***/ 5174:
/*!****************************************!*\
  !*** ./src/app/file-drop.directive.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FileDropDirective": () => (/* binding */ FileDropDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8824);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9120);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 1620);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 2014);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 8177);
/* harmony import */ var _coerce_boolean_property__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coerce-boolean-property */ 8237);
/* harmony import */ var _file_drop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./file-drop */ 2293);






let FileDropDirective = class FileDropDirective {
    constructor(el, render) {
        this.el = el;
        this.render = render;
        this.multiple$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.BehaviorSubject(false);
        this.dilesDrop = new _file_drop__WEBPACK_IMPORTED_MODULE_1__.FilesDrop(this.el.nativeElement);
        this.fileChange = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.connectable)(this.dilesDrop.dragAndDrop$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)((drop) => { var _a; return (_a = drop === null || drop === void 0 ? void 0 : drop.dataTransfer) === null || _a === void 0 ? void 0 : _a.files; }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.withLatestFrom)(this.multiple$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(([filesList, multiple]) => multiple
            ? Array.from(filesList)
            : filesList.item(0))));
        this.overClassSubscription = this.dilesDrop.over$
            .subscribe((isOver) => {
            if (isOver) {
                this.render.addClass(this.el.nativeElement, 'dragover');
            }
            else {
                this.render.removeClass(this.el.nativeElement, 'dragover');
            }
        });
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_6__.Subscription();
        this.subscription.add(this.overClassSubscription);
        this.subscription.add(this.fileChange.connect());
    }
    set multiple(multiple) {
        this.multiple$.next((0,_coerce_boolean_property__WEBPACK_IMPORTED_MODULE_0__.coerceBooleanProperty)(multiple));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
FileDropDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.ElementRef },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Renderer2 }
];
FileDropDirective.propDecorators = {
    multiple: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Input }],
    fileChange: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Output }]
};
FileDropDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Directive)({
        selector: '[fileDrop]',
        exportAs: 'fileDrop',
    })
], FileDropDirective);



/***/ }),

/***/ 2293:
/*!******************************!*\
  !*** ./src/app/file-drop.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FilesDrop": () => (/* binding */ FilesDrop)
/* harmony export */ });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 8433);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ 9566);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 7717);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 6567);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 5483);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 1607);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ 2909);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 5309);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 4168);


class FilesDrop {
    constructor(element) {
        this.element = element;
        this.dragover$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.element, 'dragover');
        this.dragleave$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.element, 'dragleave').pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_1__.mergeMap)((event) => (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.of)(event)
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.delay)(300), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.takeUntil)(this.dragover$))));
        this.drop$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_0__.fromEvent)(this.element, 'drop');
        this.over$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.merge)(this.dragover$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.mapTo)(true)), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.merge)(this.dragleave$, this.drop$).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.mapTo)(false))).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.distinctUntilChanged)(), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_8__.shareReplay)());
        this.dragAndDrop$ = this.dragover$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.tap)((evt) => {
            evt.preventDefault();
            evt.stopPropagation();
        }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.switchMapTo)(this.drop$), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.tap)((evt) => {
            evt.preventDefault();
            evt.stopPropagation();
        }));
    }
}


/***/ }),

/***/ 5079:
/*!*********************************!*\
  !*** ./src/app/files-change.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FILES_CHANGE": () => (/* binding */ FILES_CHANGE)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 9195);


const FILES_CHANGE = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('file change', {
    providedIn: 'root',
    factory: () => new rxjs__WEBPACK_IMPORTED_MODULE_1__.ReplaySubject(),
});


/***/ }),

/***/ 2434:
/*!*******************************!*\
  !*** ./src/app/frame.pipe.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "FramePipe": () => (/* binding */ FramePipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _video_videoTimeToFrame__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video/videoTimeToFrame */ 4691);



const DEFAULT_FRAME_RATE = 29.97;
const DEFAULT_START_TIME = 0;
/** Вывод Frame */
let FramePipe = class FramePipe {
    transform(currentTime = DEFAULT_START_TIME, fps = DEFAULT_FRAME_RATE) {
        if (currentTime !== null && fps !== null) {
            return (0,_video_videoTimeToFrame__WEBPACK_IMPORTED_MODULE_0__.videoTimeToFrame)(currentTime, fps);
        }
        return 0;
    }
};
FramePipe = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Pipe)({ name: 'frame' })
], FramePipe);



/***/ }),

/***/ 6804:
/*!**********************************!*\
  !*** ./src/app/timecode.pipe.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimecodePipe": () => (/* binding */ TimecodePipe)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _video_secondsToTimecode__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video/secondsToTimecode */ 981);



const DEFAULT_FRAME_RATE = 29.97;
const DEFAULT_START_TIME = 0;
/** Вывод TimeCode */
let TimecodePipe = class TimecodePipe {
    transform(currentTime = DEFAULT_START_TIME, fps = DEFAULT_FRAME_RATE) {
        if (currentTime !== null && fps !== null) {
            return (0,_video_secondsToTimecode__WEBPACK_IMPORTED_MODULE_0__.secondsToTimecode)(currentTime, fps);
        }
        return '';
    }
};
TimecodePipe = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Pipe)({ name: 'timecode' })
], TimecodePipe);



/***/ }),

/***/ 1459:
/*!***********************************************!*\
  !*** ./src/app/timeline/comment.directive.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CommentDirective": () => (/* binding */ CommentDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 4575);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 6339);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 8177);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2014);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 4168);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 6567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 5558);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 1620);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 3927);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/pointer */ 718);
/* harmony import */ var _video_video_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../video/video.service */ 532);
/* harmony import */ var _timeline_comment_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timeline-comment-store */ 4909);






let CommentDirective = class CommentDirective {
    constructor(render, elementRef, timelineComments, video) {
        this.render = render;
        this.elementRef = elementRef;
        this.timelineComments = timelineComments;
        this.video = video;
        this.rect$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this.frame$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.Subject();
        this.element = this.elementRef.nativeElement;
        this.down$ = (0,_events_pointer__WEBPACK_IMPORTED_MODULE_0__.pointerdown)(this.element);
        this.move$ = (0,_events_pointer__WEBPACK_IMPORTED_MODULE_0__.pointermove)(this.element);
        this.toFrame = (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.pipe)((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.withLatestFrom)(this.video.totalFrames$, this.rect$), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(([pointerEvent, duration, rect]) => {
            const pointerX = pointerEvent.offsetX;
            const width = rect.width;
            const position = (pointerEvent.offsetX <= 0)
                ? 0
                : (pointerX >= width)
                    ? width
                    : pointerX;
            return Math.floor(position * duration / width);
        }));
        this.drag$ = this.down$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMapTo)(this.move$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.takeUntil)((0,_events_pointer__WEBPACK_IMPORTED_MODULE_0__.pointerup)(this.element))))).pipe(this.toFrame);
        this.lastChange$ = this.down$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.switchMapTo)((0,_events_pointer__WEBPACK_IMPORTED_MODULE_0__.pointerup)(this.element).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.first)()))).pipe(this.toFrame);
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_10__.Subscription();
        console.log(`comment created!`);
        this.subscription.add(this.lastChange$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.withLatestFrom)(this.frame$), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(([drag, frame]) => [frame, drag])).subscribe((data) => {
            timelineComments.move$.next(data);
        }));
        this.subscription.add((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.combineLatest)([
            (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.merge)(this.drag$, this.frame$), this.video.totalFrames$, this.rect$
        ])
            .pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(([time, duration, rect]) => ((time / duration * rect.width) || 0))).subscribe((translate) => {
            this.render.setAttribute(this.elementRef.nativeElement, 'transform', `translate(${translate})`);
        }));
    }
    set rect(rect) {
        this.rect$.next(rect);
    }
    ;
    set frame(frame) {
        this.frame$.next(frame);
    }
    ;
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
CommentDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.Renderer2 },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ElementRef },
    { type: _timeline_comment_store__WEBPACK_IMPORTED_MODULE_2__.TimelineCommentsService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.Inject, args: [_timeline_comment_store__WEBPACK_IMPORTED_MODULE_2__.TimelineCommentsService,] }] },
    { type: _video_video_service__WEBPACK_IMPORTED_MODULE_1__.VideoService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.Inject, args: [_video_video_service__WEBPACK_IMPORTED_MODULE_1__.VideoService,] }] }
];
CommentDirective.propDecorators = {
    rect: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.Input }],
    frame: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.Input, args: ['comment',] }]
};
CommentDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Directive)({
        selector: '[comment]'
    })
], CommentDirective);



/***/ }),

/***/ 4950:
/*!**********************************************!*\
  !*** ./src/app/timeline/slider.directive.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SliderDirective": () => (/* binding */ SliderDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 6339);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8177);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 2014);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 4168);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 6567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ 1620);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3927);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var _events_pointer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../events/pointer */ 718);
/* harmony import */ var _video_video_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../video/video.service */ 532);





let SliderDirective = class SliderDirective {
    constructor(render, elementRef, video) {
        this.render = render;
        this.elementRef = elementRef;
        this.video = video;
        this.element = this.elementRef.nativeElement;
        this.down$ = (0,_events_pointer__WEBPACK_IMPORTED_MODULE_0__.pointerdown)(this.element);
        this.move$ = (0,_events_pointer__WEBPACK_IMPORTED_MODULE_0__.pointermove)(this.element);
        this.toFrame = (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.pipe)((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.withLatestFrom)(this.video.duration$), (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(([pointerEvent, duration]) => {
            const pointerX = pointerEvent.offsetX;
            const width = this.rect.width;
            const position = (pointerEvent.offsetX <= 0)
                ? 0
                : (pointerX >= width)
                    ? width
                    : pointerX;
            return (position * duration / width);
        }));
        this.drag$ = this.down$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.switchMapTo)(this.move$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_6__.takeUntil)((0,_events_pointer__WEBPACK_IMPORTED_MODULE_0__.pointerup)(this.element))))).pipe(this.toFrame);
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_7__.Subscription();
        console.log(`slider created!`);
        this.subscription.add(this.drag$.subscribe((time) => this.video.currentTimeChange$.next(time)));
        this.subscription.add((0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([
            (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.merge)(this.drag$, this.video.currentTime$),
            this.video.duration$
        ]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_4__.map)(([time, duration]) => ((time / duration * this.rect.width) || 0))).subscribe((translate) => {
            this.render.setAttribute(this.elementRef.nativeElement, 'transform', `translate(${translate})`);
        }));
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
SliderDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Renderer2 },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ElementRef },
    { type: _video_video_service__WEBPACK_IMPORTED_MODULE_1__.VideoService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Inject, args: [_video_video_service__WEBPACK_IMPORTED_MODULE_1__.VideoService,] }] }
];
SliderDirective.propDecorators = {
    rect: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.Input, args: ['slider',] }]
};
SliderDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Directive)({
        selector: '[slider]'
    })
], SliderDirective);



/***/ }),

/***/ 4909:
/*!****************************************************!*\
  !*** ./src/app/timeline/timeline-comment-store.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimelineCommentsService": () => (/* binding */ TimelineCommentsService),
/* harmony export */   "timelineCommentStore": () => (/* binding */ timelineCommentStore)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9195);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 2014);
/* harmony import */ var _canvas_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../canvas/store */ 5523);
/* harmony import */ var _comments_comments_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../comments/comments.service */ 1767);






let TimelineCommentsService = class TimelineCommentsService {
    constructor(comments) {
        this.comments = comments;
        this.move$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
        this.store$ = timelineCommentStore(this.comments.store$, this.move$);
    }
};
TimelineCommentsService.ctorParameters = () => [
    { type: _comments_comments_service__WEBPACK_IMPORTED_MODULE_1__.CommentsService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_3__.Inject, args: [_comments_comments_service__WEBPACK_IMPORTED_MODULE_1__.CommentsService,] }] }
];
TimelineCommentsService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Injectable)()
], TimelineCommentsService);

const timelineCommentStore = (store$, lastMove) => (0,_canvas_store__WEBPACK_IMPORTED_MODULE_0__.store)((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.merge)(store$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)((frames) => () => new Map(frames))), lastMove.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.map)(([oldFrame, newFrame]) => (store) => {
    const value = store.get(oldFrame);
    store.delete(oldFrame);
    store.set(newFrame, value);
    return store;
}))), new Map());


/***/ }),

/***/ 7830:
/*!************************************************!*\
  !*** ./src/app/timeline/timeline.component.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimelineComponent": () => (/* binding */ TimelineComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _D_1D_Angular_angular_pen_drawing_player_node_modules_ngtools_webpack_src_loaders_direct_resource_js_timeline_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./timeline.component.html */ 1398);
/* harmony import */ var _timeline_component_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeline.component.scss */ 1509);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 1620);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 8177);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 2014);
/* harmony import */ var _comments_comments_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../comments/comments.service */ 1767);
/* harmony import */ var _timeline_comment_store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timeline-comment-store */ 4909);







let TimelineComponent = class TimelineComponent {
    constructor(timelineComments, comments) {
        this.timelineComments = timelineComments;
        this.comments = comments;
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_4__.Subscription();
        this.subscription.add(timelineComments.move$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_5__.withLatestFrom)(timelineComments.store$), (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.map)(([_, data]) => data)).subscribe((data) => {
            this.comments.move$.next(data);
        }));
    }
    trackByFn(_, item) {
        return item.value;
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
};
TimelineComponent.ctorParameters = () => [
    { type: _timeline_comment_store__WEBPACK_IMPORTED_MODULE_3__.TimelineCommentsService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject, args: [_timeline_comment_store__WEBPACK_IMPORTED_MODULE_3__.TimelineCommentsService,] }] },
    { type: _comments_comments_service__WEBPACK_IMPORTED_MODULE_2__.CommentsService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_7__.Inject, args: [_comments_comments_service__WEBPACK_IMPORTED_MODULE_2__.CommentsService,] }] }
];
TimelineComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_8__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'timeline',
        template: _D_1D_Angular_angular_pen_drawing_player_node_modules_ngtools_webpack_src_loaders_direct_resource_js_timeline_component_html__WEBPACK_IMPORTED_MODULE_0__["default"],
        providers: [
            _timeline_comment_store__WEBPACK_IMPORTED_MODULE_3__.TimelineCommentsService,
        ],
        styles: [_timeline_component_scss__WEBPACK_IMPORTED_MODULE_1__]
    })
], TimelineComponent);



/***/ }),

/***/ 9881:
/*!************************************************!*\
  !*** ./src/app/timeline/timeline.directive.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimelineDirective": () => (/* binding */ TimelineDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 4001);


let TimelineDirective = class TimelineDirective {
    constructor(element) {
        this.element = element;
        this.rect = this.element.nativeElement.getBBox();
    }
};
TimelineDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef }
];
TimelineDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive)({
        selector: 'rect[timeline]',
        exportAs: 'timeline'
    })
], TimelineDirective);



/***/ }),

/***/ 3091:
/*!*********************************************!*\
  !*** ./src/app/timeline/timeline.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TimelineModule": () => (/* binding */ TimelineModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 8267);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/forms */ 8346);
/* harmony import */ var _common_common_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/common.module */ 2326);
/* harmony import */ var _comment_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./comment.directive */ 1459);
/* harmony import */ var _slider_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slider.directive */ 4950);
/* harmony import */ var _timeline_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./timeline.component */ 7830);
/* harmony import */ var _timeline_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./timeline.directive */ 9881);









let TimelineModule = class TimelineModule {
};
TimelineModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_8__.ReactiveFormsModule,
            [
                _common_common_module__WEBPACK_IMPORTED_MODULE_0__.AppCommonModule,
            ],
        ],
        declarations: [
            _timeline_component__WEBPACK_IMPORTED_MODULE_3__.TimelineComponent,
            _slider_directive__WEBPACK_IMPORTED_MODULE_2__.SliderDirective,
            _comment_directive__WEBPACK_IMPORTED_MODULE_1__.CommentDirective,
            _timeline_directive__WEBPACK_IMPORTED_MODULE_4__.TimelineDirective,
        ],
        exports: [
            _timeline_component__WEBPACK_IMPORTED_MODULE_3__.TimelineComponent,
        ],
    })
], TimelineModule);



/***/ }),

/***/ 981:
/*!********************************************!*\
  !*** ./src/app/video/secondsToTimecode.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "secondsToTimecode": () => (/* binding */ secondsToTimecode)
/* harmony export */ });
function secondsToTimecode(time, fps) {
    var hours = Math.floor(time / 3600) % 24;
    var minutes = Math.floor(time / 60) % 60;
    var seconds = Math.floor(time % 60);
    var frames = Math.floor(((time % 1) * fps));
    var result = (hours < 10 ? "0" + hours : hours) + ":"
        + (minutes < 10 ? "0" + minutes : minutes) + ":"
        + (seconds < 10 ? "0" + seconds : seconds) + ":"
        + (frames < 10 ? "0" + frames : frames);
    return result;
}


/***/ }),

/***/ 8537:
/*!*************************************************!*\
  !*** ./src/app/video/video-scroll.directive.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ScrollDirective": () => (/* binding */ ScrollDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 169);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9566);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 2014);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 8177);
/* harmony import */ var _video_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video.service */ 532);





let ScrollDirective = class ScrollDirective {
    constructor(video, elementRef) {
        this.video = video;
        this.elementRef = elementRef;
        this.element = this.elementRef.nativeElement;
        this.scroll$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_1__.fromEvent)(this.element, 'wheel');
        this.subscription = this.scroll$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.groupBy)((event) => event.deltaY > 0), (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.mergeMap)((group$) => (group$.key)
            ? this.scrollUp(group$)
            : this.scrollDown(group$))).subscribe((time) => {
            this.video.currentTimeChange$.next(time);
        });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    scrollUp(scroll) {
        return scroll.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.video.frameSize$, this.video.currentTime$, this.video.duration$), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(([_, frame, currentTime, duration]) => {
            const nextTime = currentTime + frame;
            return nextTime > duration ? currentTime : nextTime;
        }));
    }
    scrollDown(scroll) {
        return scroll.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.withLatestFrom)(this.video.frameSize$, this.video.currentTime$, this.video.duration$), (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.map)(([_, frame, currentTime]) => {
            const nextTime = currentTime - frame;
            return nextTime <= 0 ? currentTime : nextTime;
        }));
    }
};
ScrollDirective.ctorParameters = () => [
    { type: _video_service__WEBPACK_IMPORTED_MODULE_0__.VideoService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Inject, args: [_video_service__WEBPACK_IMPORTED_MODULE_0__.VideoService,] }] },
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_6__.Inject, args: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.ElementRef,] }] }
];
ScrollDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Directive)({
        selector: '[scroll]',
    })
], ScrollDirective);



/***/ }),

/***/ 6191:
/*!******************************************!*\
  !*** ./src/app/video/video.directive.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "VideoDirective": () => (/* binding */ VideoDirective)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _video_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./video.service */ 532);



/**
 * Слушатели на <video> элементе
 *
 * [events](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement#events)
 */
let VideoDirective = class VideoDirective {
    constructor(elementRef, video) {
        this.elementRef = elementRef;
        this.video = video;
        this.subscription = this.video.currentTimeChange$
            .subscribe((currentTime) => {
            this.elementRef.nativeElement.currentTime = currentTime;
        });
        video.video$.next(elementRef.nativeElement);
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
    play() {
        this.elementRef.nativeElement.play();
    }
    pause() {
        this.elementRef.nativeElement.pause();
    }
};
VideoDirective.ctorParameters = () => [
    { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject, args: [_angular_core__WEBPACK_IMPORTED_MODULE_1__.ElementRef,] }] },
    { type: _video_service__WEBPACK_IMPORTED_MODULE_0__.VideoService, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__.Inject, args: [_video_service__WEBPACK_IMPORTED_MODULE_0__.VideoService,] }] }
];
VideoDirective = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Directive)({
        selector: 'video',
        exportAs: 'video',
    })
], VideoDirective);



/***/ }),

/***/ 532:
/*!****************************************!*\
  !*** ./src/app/video/video.service.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_FRAME_RATE": () => (/* binding */ DEFAULT_FRAME_RATE),
/* harmony export */   "VideoService": () => (/* binding */ VideoService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 8806);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 4001);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/platform-browser */ 6219);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 9195);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 8824);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 4932);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 3927);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 2014);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 2909);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs */ 2407);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 1971);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 4168);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 7159);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 9717);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! rxjs */ 6567);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 3019);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 2812);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! rxjs */ 5309);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 1569);
/* harmony import */ var _files_change__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../files-change */ 5079);
/* harmony import */ var _videoTimeToFrame__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./videoTimeToFrame */ 4691);






const DEFAULT_FRAME_RATE = 29.97;
let VideoService = class VideoService {
    constructor(files$, sanitizer) {
        this.files$ = files$;
        this.sanitizer = sanitizer;
        this.video$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
        this.fps$ = new rxjs__WEBPACK_IMPORTED_MODULE_3__.BehaviorSubject(DEFAULT_FRAME_RATE);
        this.frameSize$ = videoFrameSize(this.fps$);
        this.duration$ = videoDuration(this.video$);
        this.totalFrames$ = videoTotalFrames(this.duration$, this.fps$);
        this.currentTimeChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__.ReplaySubject();
        this.currentTime$ = videoCurrentTime(this.video$, this.currentTimeChange$);
        this.currentFrame$ = videoCurrentFrame(this.currentTime$, this.fps$);
        this.file$ = videoFileChange(this.files$);
        this.src$ = videoSrc(this.file$, this.sanitizer);
    }
};
VideoService.ctorParameters = () => [
    { type: rxjs__WEBPACK_IMPORTED_MODULE_4__.Observable, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Inject, args: [_files_change__WEBPACK_IMPORTED_MODULE_0__.FILES_CHANGE,] }] },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.DomSanitizer, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_5__.Inject, args: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_6__.DomSanitizer,] }] }
];
VideoService = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)()
], VideoService);

function videoCurrentFrame(currentTime$, fps$) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([
        currentTime$,
        fps$,
    ]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)(([time, fps]) => (0,_videoTimeToFrame__WEBPACK_IMPORTED_MODULE_1__.videoTimeToFrame)(time, fps)), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.shareReplay)());
}
const VIDEO_START_TIME = 0;
function videoCurrentTime(video$, currentTime$) {
    const play$ = video$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.switchMap)((video) => {
        const play$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.fromEvent)(video, 'play');
        const pause$ = (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.fromEvent)(video, 'pause');
        return play$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_13__.switchMapTo)((0,rxjs__WEBPACK_IMPORTED_MODULE_14__.timer)(0, 0, rxjs__WEBPACK_IMPORTED_MODULE_15__.animationFrameScheduler).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)(() => video.currentTime), (0,rxjs__WEBPACK_IMPORTED_MODULE_16__.takeUntil)(pause$))));
    }));
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_17__.merge)(play$, currentTime$).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_18__.startWith)(VIDEO_START_TIME), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.shareReplay)());
}
function videoDuration(video$) {
    return video$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_11__.switchMap)((video) => (0,rxjs__WEBPACK_IMPORTED_MODULE_12__.fromEvent)(video, 'durationchange').pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)(() => video.duration))), (0,rxjs__WEBPACK_IMPORTED_MODULE_19__.tap)((e) => {
        console.log(`duration`, e);
    }), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.shareReplay)());
}
function isVideoFile(file) {
    return file.type === 'video/mp4';
}
function videoFileChange(files$) {
    return files$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)((files) => Array.from(files)), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)((files) => files.find(isVideoFile)), (0,rxjs__WEBPACK_IMPORTED_MODULE_20__.filter)((v) => !!v));
}
function videoSrc(file$, sanitizer) {
    return file$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)((file) => URL.createObjectURL(file)), (0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)((src) => sanitizer.bypassSecurityTrustUrl(src)), (0,rxjs__WEBPACK_IMPORTED_MODULE_18__.startWith)('https://www.html5rocks.com/tutorials/video/basics/Chrome_ImF.ogv'));
}
function videoTotalFrames(duration$, fps$) {
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.combineLatest)([
        duration$,
        fps$,
    ]).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)(([time, fps]) => (0,_videoTimeToFrame__WEBPACK_IMPORTED_MODULE_1__.videoTimeToFrame)(time, fps)), (0,rxjs__WEBPACK_IMPORTED_MODULE_10__.shareReplay)());
}
function videoFrameSize(fps$) {
    return fps$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_9__.map)((fps) => (1 / fps)));
}


/***/ }),

/***/ 4691:
/*!*******************************************!*\
  !*** ./src/app/video/videoTimeToFrame.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "videoTimeToFrame": () => (/* binding */ videoTimeToFrame),
/* harmony export */   "frameToVideoTime": () => (/* binding */ frameToVideoTime)
/* harmony export */ });
const videoTimeToFrame = (time, fps) => Math.floor(time * fps);
const frameToVideoTime = (frame, fps) => frame / fps;


/***/ }),

/***/ 271:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ 2577);
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.module */ 4750);


(0,_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__.platformBrowserDynamic)().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_0__.AppModule, {
    ngZone: 'noop'
}).then((ref) => {
    const win = window;
    // Ensure Angular destroys itself on hot reloads.
    if (win.ngRef) {
        win.ngRef.destroy();
    }
    win.ngRef = ref;
    // Otherwise, log the boot error
}).catch(err => console.error(err));


/***/ }),

/***/ 5158:
/*!***************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/app.component.html ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<div class=\"wrapper\"\n     scroll>\n  <canvas paint></canvas>\n  <video #video=\"video\"\n         [src]=\"src$ | push\"></video>\n</div>\n\n<div>\n  <input type=\"file\"\n         multiple\n         ngModel\n         (ngModelChange)=\"filesInput.next($event)\">\n\n  <color-selector></color-selector>\n\n  <input type=\"range\"\n         min=\"0.1\"\n         max=\"50\"\n         [ngModel]=\"brush.size$ | push\"\n         (ngModelChange)=\"brush.size$.next($event)\">\n\n  <select [ngModel]=\"brush.compositeOperation$ | push\"\n          (ngModelChange)=\"brush.compositeOperation$.next($event)\">\n    <option *ngFor=\"let item of brush.compositeOperations\"\n            [ngValue]=\"item.value\">{{ item.name }}</option>\n  </select>\n\n  <button (click)=\"video.play()\">play</button>\n  <button (click)=\"video.pause()\">pause</button>\n</div>\n\n<!-- <div>\n  <button (click)=\"comments.clear$.next()\">clear</button>\n</div> -->\n\n<div>\n  <span>frame rate: {{ fps$ | push }}</span>\n  <select [formControl]=\"frameRate.control\">\n    <option *ngFor=\"let item of frameRates\"\n            [ngValue]=\"item.value\">{{ item.name }}</option>\n  </select>\n  <input [value]=\"frameRate.control.value\"\n         type=\"number\"\n         [formControl]=\"frameRate.control\">\n</div>\n\n\n<span>Time:\n\n  <ng-container>{{ currentTime$ | push | timecode : (fps$ | push) }}</ng-container>\n</span>\n<span>Frame:\n\n  <ng-container>{{ currentFrame$ | push }}</ng-container>\n\n  /\n\n  <ng-container>{{ totalFrames$ | push }}</ng-container>\n</span>\n\n\n<div>\n  <timeline></timeline>\n</div>\n\n<div>\n  <button (click)=\"comments.save$.next()\"\n          [file]=\"(comments.file$ | push)\">Save</button>\n</div>\n");

/***/ }),

/***/ 1398:
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./src/app/timeline/timeline.component.html ***!
  \*****************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<svg xmlns=\"http://www.w3.org/2000/svg\"\r\n     viewBox=\"0 0 800 30\">\r\n  <rect timeline #timeline=\"timeline\"\r\n        x=\"0\"\r\n        y=\"10\"\r\n        width=\"800\"\r\n        height=\"20\"\r\n        fill=\"#007bff\" />\r\n\r\n  <g #slider\r\n     [slider]=\"timeline.rect\"\r\n     style=\"cursor: e-resize;\">\r\n    <rect x=\"-15\"\r\n          y=\"10\"\r\n          width=\"30\"\r\n          height=\"20\" />\r\n    <rect x=\"0\"\r\n          y=\"10\"\r\n          width=\"1\"\r\n          height=\"20\"\r\n          fill=\"#ffffff\" />\r\n  </g>\r\n\r\n  <g *ngFor=\"let item of (timelineComments.store$ | push | keyvalue); trackBy: trackByFn; let i = index\"\r\n     [comment]=\"item.key\"\r\n     [rect]=\"timeline.rect\"\r\n     style=\"cursor: e-resize;\">\r\n    <ellipse cx=\"0.5\"\r\n             cy=\"7\"\r\n             rx=\"3\"\r\n             ry=\"3\"\r\n             fill=\"#00ff00\" />\r\n    <rect x=\"0\"\r\n          y=\"10\"\r\n          width=\"1\"\r\n          height=\"20\"\r\n          fill=\"#ffffff\" />\r\n  </g>\r\n</svg>\r\n");

/***/ }),

/***/ 836:
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/***/ ((module) => {

module.exports = "p {\n  font-family: Lato;\n}\n\n:host {\n  display: flex;\n  flex-direction: column;\n  margin: 50px;\n}\n\n.file-drop {\n  background-color: red;\n  height: 100px;\n  width: 100px;\n  transition: background-color 1s ease-in-out;\n}\n\n.file-drop.dragover {\n  background-color: blue;\n}\n\n.wrapper {\n  display: block;\n  position: relative;\n  height: 500px;\n  width: 895px;\n}\n\n.wrapper * {\n  position: absolute;\n  height: 500px;\n  width: 895px;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\ncanvas {\n  /* height: 500px; */\n  /* width: 895px; */\n  /* background-color: red; */\n  z-index: 1;\n  touch-action: none;\n  cursor: crosshair;\n}\n\nsvg {\n  height: 30px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0FBQ0Y7O0FBRUE7RUFDRSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxZQUFBO0VBRUEsMkNBQUE7QUFBRjs7QUFFRTtFQUNFLHNCQUFBO0FBQUo7O0FBSUE7RUFDRSxjQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtBQURGOztBQUlBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsWUFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7QUFERjs7QUFJQTtFQUNFLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSwyQkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0FBREY7O0FBSUE7RUFDRSxZQUFBO0FBREYiLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsicCB7XG4gIGZvbnQtZmFtaWx5OiBMYXRvO1xufVxuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1hcmdpbjogNTBweDtcbn1cblxuLmZpbGUtZHJvcCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbiAgaGVpZ2h0OiAxMDBweDtcbiAgd2lkdGg6IDEwMHB4O1xuXG4gIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMXMgZWFzZS1pbi1vdXQ7XG5cbiAgJi5kcmFnb3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcbiAgfVxufVxuXG4ud3JhcHBlciB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGhlaWdodDogNTAwcHg7XG4gIHdpZHRoOiA4OTVweDtcbn1cblxuLndyYXBwZXIgKiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgaGVpZ2h0OiA1MDBweDtcbiAgd2lkdGg6IDg5NXB4O1xuICB0b3A6IDA7XG4gIGJvdHRvbTogMDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG59XG5cbmNhbnZhcyB7XG4gIC8qIGhlaWdodDogNTAwcHg7ICovXG4gIC8qIHdpZHRoOiA4OTVweDsgKi9cbiAgLyogYmFja2dyb3VuZC1jb2xvcjogcmVkOyAqL1xuICB6LWluZGV4OiAxO1xuICB0b3VjaC1hY3Rpb246IG5vbmU7XG4gIGN1cnNvcjogY3Jvc3NoYWlyO1xufVxuXG5zdmcge1xuICBoZWlnaHQ6IDMwcHg7XG59Il19 */";

/***/ }),

/***/ 1509:
/*!**************************************************!*\
  !*** ./src/app/timeline/timeline.component.scss ***!
  \**************************************************/
/***/ ((module) => {

module.exports = ":host {\n  display: block;\n  width: 800px;\n  touch-action: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRpbWVsaW5lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsY0FBQTtFQUVBLFlBQUE7RUFHQSxrQkFBQTtBQUZGIiwiZmlsZSI6InRpbWVsaW5lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xyXG4gIGRpc3BsYXk6IGJsb2NrO1xyXG4gIC8vIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICB3aWR0aDogODAwcHg7XHJcbiAgLy8gaGVpZ2h0OiAyMHB4O1xyXG4gIC8vIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XHJcbiAgdG91Y2gtYWN0aW9uOiBub25lO1xyXG59Il19 */";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(271)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map
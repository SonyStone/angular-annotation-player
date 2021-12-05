import { combineLatest, fromEvent, groupBy, map, mergeMap, Observable, share, switchMap } from "rxjs";
import { shareReplay } from "rxjs/operators";
import { VideoTime } from "../interfaces/VideoTime";
import { VideoDirective, VideoService } from "./video.directive";

export const scrollVideo = (
  element$: Observable<HTMLElement>,
  video: VideoService,
  fps$: Observable<number>,
 ): Observable<VideoTime> => {
   const scroll$ = element$.pipe(switchMap((element) => fromEvent<WheelEvent>(element, 'wheel')));
   const frame$ = fps$.pipe(map((fps) => (1 / fps) as VideoTime));

   const scrollUp = (scroll: Observable<WheelEvent>) => combineLatest([frame$, scroll]).pipe(
     map(([frame]) => {
       const nextTime = video.currentTime() + frame as VideoTime;
       return nextTime > video.duration() ? video.currentTime() as VideoTime : nextTime
     }),
   );

   const scrollDown = (scroll: Observable<WheelEvent>) => combineLatest([frame$, scroll]).pipe(
     map(([frame]) => {
       const nextTime = video.currentTime() - frame as VideoTime;
       return nextTime <= 0 ? video.currentTime() as VideoTime : nextTime
     }),
   )
 
   return scroll$.pipe(
     groupBy((event) => event.deltaY > 0),
     mergeMap((group$) => (group$.key)
       ? scrollUp(group$)
       : scrollDown(group$)
     ),
     shareReplay(),
   );
}


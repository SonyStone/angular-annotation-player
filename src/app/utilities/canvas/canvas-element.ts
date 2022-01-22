import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable()
export class CanvasElement extends ReplaySubject<HTMLCanvasElement> {}
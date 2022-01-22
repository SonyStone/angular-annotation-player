import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NextComment extends Subject<void> {}
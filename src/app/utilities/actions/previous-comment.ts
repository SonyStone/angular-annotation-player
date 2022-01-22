import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class PreviousComment extends Subject<void> {}
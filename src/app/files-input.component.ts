import { Component, Inject } from '@angular/core';
import { Subject } from 'rxjs';

import { FILES_CHANGE } from './utilities/files-change';

@Component({
  selector: 'files-input',
  template: `
  
  <input type="file"
         multiple
         ngModel
         (ngModelChange)="filesInput.next($event)">
  
  `
})

export class FilesInputComponent {
  constructor(
    @Inject(FILES_CHANGE) readonly filesInput: Subject<FileList>,
  ) { }
}
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';

import { FileChange } from '../utilities/files-change';

@Component({
  selector: 'files-input',
  template: `
  
  <input type="file"
         multiple
         ngModel
         (ngModelChange)="filesInput.next($event)">
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FilesInputComponent {
  constructor(
    @Inject(FileChange) readonly filesInput: FileChange,
  ) { }
}
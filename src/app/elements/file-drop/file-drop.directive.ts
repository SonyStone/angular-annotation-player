import { Directive, ElementRef, OnDestroy, Output, Renderer2 } from '@angular/core';
import { connectable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { FilesDrop } from './file-drop';

@Directive({
  selector: '[fileDrop]',
  exportAs: 'fileDrop',
})
export class FileDropDirective implements OnDestroy {

  private readonly filesDrop = new FilesDrop(this.el.nativeElement);

  @Output() readonly fileChange = connectable<FileList>(this.filesDrop.dragAndDrop$.pipe(
    map((drop) => drop?.dataTransfer?.files!),
    filter((files) => !!files),
  ));

  private subscription = new Subscription();

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly render: Renderer2,
  ) {
    this.subscription.add(this.filesDrop.over$.subscribe((isOver) => {
      if (isOver) {
        this.render.addClass(this.el.nativeElement, 'dragover');
      } else {
        this.render.removeClass(this.el.nativeElement, 'dragover');
      }
    }));

    this.subscription.add(this.fileChange.connect());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

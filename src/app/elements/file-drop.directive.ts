import { Directive, ElementRef, Input, OnDestroy, Output, Renderer2 } from '@angular/core';
import { BehaviorSubject, connectable, Subscription } from 'rxjs';
import { map, withLatestFrom } from 'rxjs/operators';

import { coerceBooleanProperty } from '../common/coerce-boolean-property';
import { FilesDrop } from './file-drop';

@Directive({
  selector: '[fileDrop]',
  exportAs: 'fileDrop',
})
export class FileDropDirective implements OnDestroy {

  private readonly multiple$ = new BehaviorSubject<boolean>(false);

  @Input() set multiple(multiple: any ) {
    this.multiple$.next(coerceBooleanProperty(multiple))
  }

  private readonly dilesDrop = new FilesDrop(this.el.nativeElement)

  @Output() readonly fileChange = connectable<any>(this.dilesDrop.dragAndDrop$.pipe(
    map((drop) => drop?.dataTransfer?.files as any),
    withLatestFrom(this.multiple$),
    map(([filesList, multiple]) => multiple
      ? Array.from(filesList)
      : filesList.item(0)
    ),
  ));

  private readonly overClassSubscription = this.dilesDrop.over$
    .subscribe((isOver) => {
      if (isOver) {
        this.render.addClass(this.el.nativeElement, 'dragover');
      } else {
        this.render.removeClass(this.el.nativeElement, 'dragover');
      }
    });

  private subscription = new Subscription();

  constructor(
    private readonly el: ElementRef<HTMLElement>,
    private readonly render: Renderer2,
  ) {
    this.subscription.add(this.overClassSubscription)
    this.subscription.add(this.fileChange.connect());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Directive, ElementRef, Inject, NgModule, OnDestroy, Output } from '@angular/core';
import { connectable } from 'rxjs';
import { pointerdrag } from 'src/app/events/pointer';

@Directive({ selector: '[drag]' })
export class DragDirective implements OnDestroy {

  @Output('drag')
  drag = connectable(pointerdrag(this.elementRef.nativeElement));

  private readonly subscription = this.drag.connect();

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef<Element>,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}


@NgModule({
  declarations: [DragDirective],
  exports: [DragDirective],
})
export class DragModule { }

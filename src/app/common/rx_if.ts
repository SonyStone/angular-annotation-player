import {
  ChangeDetectorRef,
  Directive,
  EmbeddedViewRef,
  Input,
  NgModule,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  ɵstringify as stringify,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';


@Directive({ selector: '[rxIf]' })
export class RxIf<T = unknown> implements OnDestroy {
  private _context: NgIfContext<T> = new NgIfContext<T>();
  private _thenTemplateRef: TemplateRef<NgIfContext<T>> | null = null;
  private _elseTemplateRef: TemplateRef<NgIfContext<T>> | null = null;
  private _thenViewRef: EmbeddedViewRef<NgIfContext<T>> | null = null;
  private _elseViewRef: EmbeddedViewRef<NgIfContext<T>> | null = null;

  private subscription!: Subscription;

  constructor(
    private _viewContainer: ViewContainerRef,
    templateRef: TemplateRef<NgIfContext<T>>,
    private cd: ChangeDetectorRef,
  ) {
    this._thenTemplateRef = templateRef;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  /**
   * The Boolean expression to evaluate as the condition for showing a template.
   */
  @Input('rxIf')
  set rxIf(condition$: Observable<T>) {
    this.subscription?.unsubscribe()
    this.subscription = condition$.subscribe((condition) => {
      this._context.$implicit = this._context.rxIf = condition;
      this._updateView();
      this.cd.detectChanges();
    })
  }

  /**
   * A template to show if the condition expression evaluates to true.
   */
  @Input()
  set rxIf$Then(templateRef: TemplateRef<NgIfContext<T>> | null) {
    assertTemplate('rxIfThen', templateRef);
    this._thenTemplateRef = templateRef;
    this._thenViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  /**
   * A template to show if the condition expression evaluates to false.
   */
  @Input()
  set rxIfElse(templateRef: TemplateRef<NgIfContext<T>> | null) {
    assertTemplate('rxIfElse', templateRef);
    this._elseTemplateRef = templateRef;
    this._elseViewRef = null;  // clear previous view if any.
    this._updateView();
  }

  private _updateView() {
    if (this._context.$implicit) {
      if (!this._thenViewRef) {
        this._viewContainer.clear();
        this._elseViewRef = null;
        if (this._thenTemplateRef) {
          this._thenViewRef =
            this._viewContainer.createEmbeddedView(this._thenTemplateRef, this._context);
        }
      }
    } else {
      if (!this._elseViewRef) {
        this._viewContainer.clear();
        this._thenViewRef = null;
        if (this._elseTemplateRef) {
          this._elseViewRef =
            this._viewContainer.createEmbeddedView(this._elseTemplateRef, this._context);
        }
      }
    }
  }

  /** @internal */
  public static rxIfUseIfTypeGuard: void;

  /**
   * Assert the correct type of the expression bound to the `rxIf` input within the template.
   *
   * The presence of this static field is a signal to the Ivy template type check compiler that
   * when the `NgIf` structural directive renders its template, the type of the expression bound
   * to `rxIf` should be narrowed in some way. For `NgIf`, the binding expression itself is used to
   * narrow its type, which allows the strictNullChecks feature of TypeScript to work with `NgIf`.
   */
  static ngTemplateGuard_rxIf: 'binding';

  /**
   * Asserts the correct type of the context for the template that `NgIf` will render.
   *
   * The presence of this method is a signal to the Ivy template type-check compiler that the
   * `NgIf` structural directive renders its template with a specific context type.
   */
  static ngTemplateContextGuard<T>(dir: RxIf<T>, ctx: any):
    ctx is NgIfContext<Exclude<T, false | 0 | '' | null | undefined>> {
    return true;
  }
}

/**
 * @publicApi
 */
export class NgIfContext<T = unknown> {
  public $implicit: T = null!;
  public rxIf: T = null!;
}

function assertTemplate(property: string, templateRef: TemplateRef<any> | null): void {
  const isTemplateRefOrNull = !!(!templateRef || templateRef.createEmbeddedView);
  if (!isTemplateRefOrNull) {
    throw new Error(`${property} must be a TemplateRef, but received '${stringify(templateRef)}'.`);
  }
}



@NgModule({
  exports: [RxIf],
  declarations: [RxIf],
})
export class RxIfModule { }

import {
  ChangeDetectorRef,
  EventEmitter,
  OnDestroy,
  Pipe,
  PipeTransform,
  Type,
  ɵstringify as stringify,
  ɵisPromise,
  ɵisSubscribable,
} from '@angular/core';
import { Observable, Subscribable, Unsubscribable } from 'rxjs';

export function invalidPipeArgumentError(type: Type<any>, value: Object) {
  return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}

interface SubscriptionStrategy {
  createSubscription(
    async: Subscribable<any> | Promise<any>,
    updateLatestValue: any
  ): Unsubscribable | Promise<any>;
  dispose(subscription: Unsubscribable | Promise<any>): void;
  onDestroy(subscription: Unsubscribable | Promise<any>): void;
}

class SubscribableStrategy implements SubscriptionStrategy {
  createSubscription(
    async: Subscribable<any>,
    updateLatestValue: any
  ): Unsubscribable {
    return async.subscribe({
      next: updateLatestValue,
      error: (e: any) => {
        throw e;
      },
    });
  }

  dispose(subscription: Unsubscribable): void {
    subscription.unsubscribe();
  }

  onDestroy(subscription: Unsubscribable): void {
    subscription.unsubscribe();
  }
}

class PromiseStrategy implements SubscriptionStrategy {
  createSubscription(
    async: Promise<any>,
    updateLatestValue: (v: any) => any
  ): Promise<any> {
    return async.then(updateLatestValue, (e) => {
      throw e;
    });
  }

  dispose(subscription: Promise<any>): void {}

  onDestroy(subscription: Promise<any>): void {}
}

const promiseStrategy = new PromiseStrategy();
const subscribableStrategy = new SubscribableStrategy();

/**
 * @ngModule CommonModule
 * @description
 *
 * Unwraps a value from an asynchronous primitive.
 *
 * The `async` pipe subscribes to an `Observable` or `Promise` and returns the latest value it has
 * emitted. When a new value is emitted, the `async` pipe marks the component to be checked for
 * changes. When the component gets destroyed, the `async` pipe unsubscribes automatically to avoid
 * potential memory leaks.
 *
 * @usageNotes
 *
 * ### Examples
 *
 * This example binds a `Promise` to the view. Clicking the `Resolve` button resolves the
 * promise.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipePromise'}
 *
 * It's also possible to use `async` with Observables. The example below binds the `time` Observable
 * to the view. The Observable continuously updates the view with the current time.
 *
 * {@example common/pipes/ts/async_pipe.ts region='AsyncPipeObservable'}
 *
 * @publicApi
 */
@Pipe({ name: 'push', pure: false })
export class PushPipe implements OnDestroy, PipeTransform {
  private latestValue: any = null;

  private subscription: Unsubscribable | Promise<any> | null = null;
  private obj: Subscribable<any> | Promise<any> | EventEmitter<any> | null =
    null;
  private strategy: SubscriptionStrategy = null!;

  constructor(
    private cd: ChangeDetectorRef,
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.dispose();
    }
  }

  // NOTE(@benlesh): Because Observable has deprecated a few call patterns for `subscribe`,
  // TypeScript has a hard time matching Observable to Subscribable, for more information
  // see https://github.com/microsoft/TypeScript/issues/43643

  transform<T>(obj: Observable<T> | Subscribable<T> | Promise<T>): T | null;
  transform<T>(obj: null | undefined): null;
  transform<T>(
    obj: Observable<T> | Subscribable<T> | Promise<T> | null | undefined
  ): T | null;
  transform<T>(
    obj: Observable<T> | Subscribable<T> | Promise<T> | null | undefined
  ): T | null {
    if (!this.obj) {
      if (obj) {
        this.subscribe(obj);
      }
      return this.latestValue;
    }

    if (obj !== this.obj) {
      this.dispose();
      return this.transform(obj);
    }

    return this.latestValue;
  }

  private subscribe(
    obj: Subscribable<any> | Promise<any> | EventEmitter<any>
  ): void {
    this.obj = obj;
    this.strategy = this.selectStrategy(obj);
    this.subscription = this.strategy.createSubscription(
      obj,
      (value: Object) => this.updateLatestValue(obj, value)
    );
  }

  private selectStrategy(
    obj: Subscribable<any> | Promise<any> | EventEmitter<any>
  ): any {
    if (ɵisPromise(obj)) {
      return promiseStrategy;
    }

    if (ɵisSubscribable(obj)) {
      return subscribableStrategy;
    }

    throw invalidPipeArgumentError(PushPipe, obj);
  }

  private dispose(): void {
    this.strategy.dispose(this.subscription!);
    this.latestValue = null;
    this.subscription = null;
    this.obj = null;
  }

  private updateLatestValue(async: any, value: Object): void {
    if (async === this.obj) {
      this.latestValue = value;
      this.cd.detectChanges();
      // markDirty((this.viewContainerRef as any)?._hostView?.[8]);
      // this._ref
    }
  }
}

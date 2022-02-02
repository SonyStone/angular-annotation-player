import { Inject, Injectable, OnDestroy } from '@angular/core';

import { AppStore } from './app.store';
import { StateHistory } from './state-history';

@Injectable()
export class AppHistory extends StateHistory<AppStore, any> implements OnDestroy {

  constructor(
    @Inject(AppStore) store: AppStore,
  ) {
    super(store, { maxAge: 25 })
  }

  ngOnDestroy(): void {
    this.destroy();
  }
}
import { enableProdMode, NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, {
  ngZone: 'noop'
}).then((ref) => {

  const win = window as Window & typeof globalThis & { ngRef: NgModuleRef<AppModule> }

  // Ensure Angular destroys itself on hot reloads.
  if (win.ngRef) {
    win.ngRef.destroy();
  }
  win.ngRef = ref;

  // Otherwise, log the boot error
}).catch(err => console.error(err));
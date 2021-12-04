import { NgModuleRef } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'zone.js';
import { AppModule } from './app/app.module';


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
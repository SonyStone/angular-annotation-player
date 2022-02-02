import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AnnotationPlayerModule } from './annotation-player.module';
import { AppComponent } from './app.component';
import { RxIfModule } from './common/rx_if';

@NgModule({
  imports: [
    [
      BrowserModule,
    ],
    [
      RxIfModule,
    ],
    [
      AnnotationPlayerModule
    ],
  ],
  declarations: [
    AppComponent,
  ],
  bootstrap:    [
    AppComponent,
  ]
})
export class AppModule {
  constructor(
    private injector: Injector,
  ) {} 

  // ngDoBootstrap() {
  //   const element = createCustomElement(AppComponent, { injector: this.injector })
  //   customElements.define("annotation-player", element);    
  // }
}

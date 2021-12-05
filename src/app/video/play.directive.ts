import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[play]',
})
export class PlayDirective  {

  @HostListener('click')
  play(): void  {
    // this.video.play();
  }
}

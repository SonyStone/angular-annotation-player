import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';

@Component({
  selector: 'icon-eraser',
  templateUrl: 'eraser.svg',
  styleUrls: ['icon.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconEraserComponent {}

@NgModule({
  exports: [IconEraserComponent],
  declarations: [IconEraserComponent],
})
export class IconEraserModule { }

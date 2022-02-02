import { DOCUMENT } from "@angular/common";
import { Directive, Inject, Input, OnDestroy } from "@angular/core";

@Directive({
  selector: `[file]`,
})
export class FileDownloadDirective implements OnDestroy {

  private a = this.document.createElement('a');

  @Input('file') set src(file: File | null | void) {
    if (file) {
      const downloadLink = URL.createObjectURL(file)

      this.a.href = downloadLink;
      this.a.download = 'test.json';
  
      this.a.click();
    }
  };


  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ngOnDestroy(): void {
    this.a.remove();
  }
}

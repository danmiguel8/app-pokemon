import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'borderCard',
  standalone: true
})
export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#009686';
  private defaultHeight: number = 200;

  private defaultBgColor: string = '#009686';

  constructor(private el: ElementRef) {
    this.setBorder(this.initialColor);
    this.setHeight(this.defaultHeight);
    this.setBgColor(this.initialColor);
    this.setScale(1);
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder(this.defaultColor);
    this.setBgColor(this.defaultBgColor);
    this.setScale(1.1);
    this.setTransition();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
    this.setBgColor(this.initialColor);
    this.setScale(1);
    this.setTransition();
  }

  private setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  private setBgColor(defaultBgColor: string) {
    this.el.nativeElement.style.backgroundColor = defaultBgColor;
  }

  private setScale(scale: number) {
    this.el.nativeElement.style.transform = `scale(${scale})`;
  }

  private setTransition() {
    this.el.nativeElement.style.transition = 'all 0.3s ease-in-out';
  }
}

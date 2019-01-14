import { Directive, ElementRef, Input, Output, OnChanges, EventEmitter, HostListener } from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements OnChanges {
  focusValue: boolean;

  @Output()
  focusChange = new EventEmitter<boolean>();

  @Input()
  get focus() {
    return this.focusValue;
  }
  set focus(val) {
    this.focusValue = val;
    this.focusChange.emit(val);
  }

  @Input() focusDelay: number = 0;

  constructor(private elementRef: ElementRef) { }

  @HostListener("blur", ["$event.target"])
  onBlur() {
    this.focus = false;
  }

  ngOnChanges() {
    this.checkFocus();
  }

  private checkFocus() {
    if (this.focus && document.activeElement !== this.elementRef.nativeElement) {
      this.elementRef.nativeElement.focus();
    }
  }
}
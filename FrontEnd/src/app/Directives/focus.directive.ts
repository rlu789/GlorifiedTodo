import { Directive, ElementRef, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appFocus]',
})
export class FocusDirective implements OnChanges {
  focusValue: boolean;

  @Output()
  focusChange = new EventEmitter<boolean>();

  @Input() 
  get focus(){
    return this.focusValue;
  }
  set focus(val){
    this.focusValue = val;
    this.focusChange.emit(val);
  }
  
  @Input() focusDelay: number = 0;

  constructor(private elementRef: ElementRef) { }

  ngOnChanges() {
    // TODO this isnt always triggered
    this.checkFocus();
  }

  private checkFocus() {
    if (this.focus && document.activeElement !== this.elementRef.nativeElement) {
      this.elementRef.nativeElement.focus();
      this.focus = false;
    }
  }
}
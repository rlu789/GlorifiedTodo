import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.css']
})
export class CustomTextComponent implements OnInit {
  private control: FormControl;
  private isRawValue: boolean = false;
  private focusValue: boolean;
  private errMsg: string;

  @Input('placeholder') placeholder: string;
  @Input('type') type: string = 'text';
  @Input('fullWidth') fullWidth: boolean;
  @Input('textArea') textArea: boolean = false;

  @Output()
  fldChange = new EventEmitter<FormControl | number | string>();
  @Input()
  get fld() {
    return this.control;
  }
  set fld(fld: FormControl | number | string) {
    if (fld instanceof FormControl) {
      this.control = fld;
    }
    else {
      this.control = new FormControl(fld);
      this.isRawValue = true;
    }

    this.control.valueChanges.subscribe(() => {
      if (this.control.errors) {
        var errors = [];
        Object.keys(this.control.errors).forEach((key) => {
          errors.push(this.control.errors[key]);
        });
        this.errMsg = errors.join(", ");
      }
    });
  }
  @Input('visible') visible: boolean = true;

  @Output() focusTriggerChange = new EventEmitter();
  @Input()
  get focusTrigger() {
    return this.focusValue;
  }
  set focusTrigger(val: boolean) {
    this.focusValue = val;
    this.focusTriggerChange.emit(val);
  }

  @Output('onEnterFunc') onEnterFunc = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  enterKeyUp() {
    if (this.onEnterFunc) this.onEnterFunc.emit();
  }

  update() {
    if (this.isRawValue) { // on change, emit raw value back up to parent
      this.fldChange.emit(this.control.value);
    }
  }
}

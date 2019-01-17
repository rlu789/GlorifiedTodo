import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.css']
})
export class CustomTextComponent implements OnInit {
  private _fld: FormControl;
  private originalFld: FormControl | number | string;
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
    return this._fld;
  }
  set fld(fld: FormControl | number | string) {
    this.originalFld = fld;
    if (this.originalFld instanceof FormControl) {
      this._fld = this.originalFld;
    }
    else {
      this._fld = new FormControl(this.originalFld);
    }

    this._fld.valueChanges.subscribe(() => {
      if (this._fld.errors) {
        var errors = [];
        Object.keys(this._fld.errors).forEach((key) => {
          errors.push(this._fld.errors[key]);
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
    if (!(this.originalFld instanceof FormControl)) { // on change, emit raw value back up to parent
      this.fldChange.emit(this._fld.value);
    }
  }
}

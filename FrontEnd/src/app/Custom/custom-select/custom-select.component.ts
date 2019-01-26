import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-select',
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.css']
})
export class CustomSelectComponent implements OnInit {
  // todo add custom form control for validation
  fldValue: number | string;

  @Output()
  fldChange = new EventEmitter<number | string>();
  @Input()
  get fld() {
    return this.fldValue;
  }
  set fld(fld: number | string) {
    this.fldValue = fld;
    this.fldChange.emit(fld);
  }

  @Input("options") options: [{text: string, value: number | string}];
  @Input("placeholder") placeholder: string;
  @Input("fullWidth") fullWidth: boolean;

  constructor() { }

  ngOnInit() {
  }

}

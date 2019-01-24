import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.css']
})
export class CustomButtonComponent implements OnInit {
  @Input('type') type: 'mat-button' | 'mat-raised-button' | 'mat-stroked-button' | 'mat-flat-button' | 
    'mat-fab' | 'mat-mini-fab' = 'mat-raised-button';
  @Input('text') text: string;
  @Input('color') color: string;
  @Input('floatRight') floatRight: boolean;
  @Output('clickFunc') clickFunc = new EventEmitter();

  loading = false;

  constructor() { }

  ngOnInit() {
  }

  click(){
    var self = this;
    self.loading = true;
    var observer = {
      complete: () => { self.loading = false; }
    };
    var observable = new Observable();
    observable.subscribe(observer);
    this.clickFunc.emit(observer); // send the event back up to parent so that parent func can call $event.complete()
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Subscription, Subscriber } from 'rxjs';

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
  @Input('btnFunc') btnFunc: () => Subscriber<any> | Subscription | null;

  private loading = false;

  constructor() { }

  ngOnInit() {
  }

  click() {
    var ret = this.btnFunc();
    const isSubscription = ret instanceof Subscription;
    const isSubscriber = ret instanceof Subscriber;

    if (isSubscription || isSubscriber) {
      this.loading = true;
      // add a callback to be triggered when the complete func of an observable is called
      ret.add(() => {
        this.loading = false;
      });
    }
  }

}

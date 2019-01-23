import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.css']
})
export class CustomMenuComponent implements OnInit {
  @Input('items') items: [string];
  @Output('func') func = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  optionClicked(option: string) {
    this.func.emit(option);
  }

}

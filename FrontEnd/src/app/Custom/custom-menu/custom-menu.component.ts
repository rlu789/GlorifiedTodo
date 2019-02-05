import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-menu',
  templateUrl: './custom-menu.component.html',
  styleUrls: ['./custom-menu.component.css']
})
export class CustomMenuComponent implements OnInit {
  iconClass: string;

  @Input('icon') icon: string;
  @Input('items') items: {text: string, icon: string}[];
  @Output('func') func = new EventEmitter();

  constructor() { }

  ngOnInit() {
    this.buildIconClass();
  }

  private buildIconClass(): void {
    this.iconClass = "btn-base btn-menu float-right " + this.icon;
  }

  optionClicked(option: string) {
    this.func.emit(option);
  }

}

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-heading',
  templateUrl: './custom-heading.component.html',
  styleUrls: ['./custom-heading.component.css']
})
export class CustomHeadingComponent implements OnInit {
  @Input('title') title: string;
  @Input('underline') underline: boolean = true;
  @Input('icon') icon: string;

  @Output('iconFunc') iconFunc = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  click(){
    this.iconFunc.emit();
  }
}

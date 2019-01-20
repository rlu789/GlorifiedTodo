import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-file',
  templateUrl: './custom-file.component.html',
  styleUrls: ['./custom-file.component.css']
})
export class CustomFileComponent implements OnInit {
  private imgDataValue: string;

  @Output()
  imgDataChange = new EventEmitter<string>();
  @Input()
  get imgData() {
    return this.imgDataValue;
  }
  set imgData(val) {
    this.imgDataValue = val;
    this.imgDataChange.emit(val);
  }
  @Input('inputClass') inputClass: string = "img-add";
  @Input('removable') removable: boolean = false;
  @Input('showBtns') showBtns: boolean = true;

  onFileChanged(event) {
    var self = this;
    const blob = new Blob([event.target.files[0]], { type: "image/png" });

    var r = new FileReader();
    r.onload = function () {
      // console.log(r.result);
      // document.querySelector('img').src = r.result as string;
      // http://jsfiddle.net/poej7r6k/
      self.imgData = r.result as string;
    };
    r.readAsDataURL(blob);

    // console.log(blob);

    // const imageUrl = URL.createObjectURL(blob);
    // const img = document.querySelector('img');
    // img.addEventListener('load', () => URL.revokeObjectURL(imageUrl));
    // document.querySelector('img').src = imageUrl;
  }

  remove() {
    this.imgData = undefined;
  }

  constructor() { }

  ngOnInit() {
  }

}

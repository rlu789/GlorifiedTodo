import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-custom-file',
  templateUrl: './custom-file.component.html',
  styleUrls: ['./custom-file.component.css']
})
export class CustomFileComponent implements OnInit {
  private maxFileSize: number = 500000; // 0.5mb
  imgDataValue: string;

  @Output()
  imgDataChange = new EventEmitter<string>();
  @Input()
  get imgData() {
    return this.imgDataValue;
  }
  set imgData(val) {
    this.imgDataValue = val;
    this.imgDataChange.emit(val);
    if (this.onChangeCallback) this.onChangeCallback.emit();
  }
  @Input('inputClass') inputClass: string = "img-add";
  @Input('showBtns') showBtns: boolean = true;

  @Output('onChangeCallback') onChangeCallback = new EventEmitter<any>();

  onFileChanged(event) {
    var self = this;
    const blob = new Blob([event.target.files[0]], { type: "image/jpeg" });
    // console.log(blob);

    if (blob.size <= this.maxFileSize) { 
      var r = new FileReader();
      r.onload = function () {
        // console.log(r.result);
        // document.querySelector('img').src = r.result as string;
        // http://jsfiddle.net/poej7r6k/
        self.imgData = r.result as string;
      };
      r.readAsDataURL(blob);
    }
    else {
      // console.log("resized");
      window.URL = window.URL;
      var blobURL = window.URL.createObjectURL(blob); // and get it's URL

      // helper Image object
      var image = new Image();
      image.src = blobURL;
      image.onload = function () {
        // have to wait till it's loaded
        var resized = self.resizeMe(image, image.width, image.height, self.maxFileSize/blob.size); // resized image url
        // console.log(resized);
        self.imgData = resized;
      }
    }
  }

  resizeMe(img: HTMLImageElement, rawWidth: number, rawHeight: number, resizeQuality: number): string {

    var canvas = document.createElement('canvas');

    var width = img.width;
    var height = img.height;

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > rawWidth) {
        //height *= max_width / width;
        height = Math.round(height *= rawWidth / width);
        width = rawWidth;
      }
    } else {
      if (height > rawHeight) {
        //width *= max_height / height;
        width = Math.round(width *= 1000 / rawHeight);
        height = rawHeight;
      }
    }

    // resize the canvas and draw the image data into it
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg", resizeQuality); // get the data from canvas as whatever% JPG (can be also PNG, etc.)

    // you can get BLOB too by using canvas.toBlob(blob => {});
  }

  remove() {
    this.imgData = undefined;
  }

  constructor() { }

  ngOnInit() {
  }

}

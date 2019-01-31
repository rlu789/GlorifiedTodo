import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../Services/cards.service';
import { Subscriber } from 'rxjs';
import { CustomFormGroup, CustomFormControl } from 'src/app/Custom/Base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-card-collection-edit',
  templateUrl: './card-collection-edit.component.html',
  styleUrls: ['./card-collection-edit.component.css']
})
export class CardCollectionEditComponent implements OnInit {
  addSubscriber: Subscriber<any>;

  cardTitle = new CustomFormControl('', Validators.required);
  cardDesc = new CustomFormControl('', Validators.required);
  imgData: string;
  addCardGroup = new CustomFormGroup({
    cardTitle: this.cardTitle,
    cardDesc: this.cardDesc
  });

  @Input('addEvent') addEvent: (...args: any[]) => Subscriber<any> | null;

  constructor() {
  }

  ngOnInit() {
  }

  addFunc() {
    if (this.addCardGroup.formSubmittable()) {
      var card = new Card(this.cardTitle.value, this.cardDesc.value);
      card.imgData = this.imgData;
      this.addSubscriber = this.addEvent(card);
      if (this.addSubscriber instanceof Subscriber) {
        // add a callback to be triggered when the complete func is called
        return this.addSubscriber.add(() => {
          this.cardTitle.reset();
          this.cardDesc.reset();
          this.imgData = '';
        });
      }
    }
  }
}

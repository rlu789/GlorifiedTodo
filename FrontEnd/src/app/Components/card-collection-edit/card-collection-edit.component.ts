import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Card } from '../../Services/cards.service';
import { CustomFormGroup, CustomFormControl } from 'src/app/Custom/Base';

@Component({
  selector: 'app-card-collection-edit',
  templateUrl: './card-collection-edit.component.html',
  styleUrls: ['./card-collection-edit.component.css']
})
export class CardCollectionEditComponent implements OnInit {
  cardTitle = new CustomFormControl('');
  cardDesc = new CustomFormControl('');
  imgData: string;

  @Input('index') index: number;
  @Input('collectionId') collectionId: number;

  @Output('addEvent') addEvent = new EventEmitter<{ btnEvent: any, onCompleteEvent: Function, card: Card, index: number, collectionId: number }>();
  @Output('deleteEvent') deleteEvent = new EventEmitter<{ btnEvent: any, index: number }>();

  constructor() {
  }

  ngOnInit() {
  }

  addFunc($event) {
    var self = this;
    var card = new Card(this.cardTitle.value, this.cardDesc.value, this.collectionId);
    card.imgData = this.imgData;

    var onCompleteEvent = function () {
      self.cardTitle.reset();
      self.cardDesc.reset();
      self.imgData = '';
    }

    this.addEvent.emit({
      btnEvent: $event,
      onCompleteEvent: onCompleteEvent,
      card: card,
      index: this.index,
      collectionId: this.collectionId
    });
  }

  deleteFunc($event) {
    this.deleteEvent.emit({
      btnEvent: $event,
      index: this.index
    });
  }

}

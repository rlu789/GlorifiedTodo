import { Component, OnInit, Input } from '@angular/core';
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { CardsService, Card } from '../../Services/cards.service';
import { HttpErrorResponse } from "@angular/common/http";

import { ConfirmModalComponent } from '../../Modals/confirm-modal/confirm-modal.component';
import { EditCardModalComponent } from '../../Modals/edit-card-modal/edit-card-modal.component';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  @Input('collectionData') collectionData: Array<CardCollection>;
  @Input('editable') editable: boolean;
  @Input('password') password: string;

  constructor(private cardsService: CardsService, private cardCollectionsService: CardCollectionsService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  editCard(collectionIndex: number, cardIndex: number) {
    var cardToBeEdited = this.collectionData[collectionIndex].card[cardIndex];
    // console.log(cardToBeEdited);

    var dialogConfig = {
      width: '1000px',
      height: undefined,
      data: { card: cardToBeEdited, password: this.password, editable: this.editable }
    }
    if (cardToBeEdited.imgData) dialogConfig.height = '900px';
    const dialogRef = this.dialog.open(EditCardModalComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((card: Card) => {
      if (card) this.collectionData[collectionIndex].card[cardIndex] = card;
    });
  }

  deleteCol($event: { btnEvent: any, index: number }) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      restoreFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardCollectionsService.remove(this.collectionData[$event.index], this.password).subscribe((data: any) => {
          this.collectionData.splice($event.index, 1);
          $event.btnEvent.complete();
        }, (err: HttpErrorResponse) => {
          $event.btnEvent.complete();
        });
      }
      else
        $event.btnEvent.complete();
    })
  }

  deleteCard(collectionIndex: number, cardIndex: number) {
    var cardToBeDeleted = this.collectionData[collectionIndex].card[cardIndex];
    // console.log(cardToBeDeleted);
    this.cardsService.remove(cardToBeDeleted, this.password).subscribe((data: any) => {
      // console.log(data);
      this.collectionData[collectionIndex].card.splice(cardIndex, 1);
    })
  }

  addCard($event: {btnEvent: any, onCompleteEvent: Function, card: Card, index: number, collectionId: number}) {
    if (!this.collectionData[$event.index].card) this.collectionData[$event.index].card = [];
    this.cardsService.add($event.card, this.password).subscribe((data: Card) => {
      // console.log(data);
      this.collectionData[$event.index].card.push(data);
      $event.onCompleteEvent();
      $event.btnEvent.complete();
    }, (err: HttpErrorResponse) => {
      $event.btnEvent.complete();
    });
  }
}

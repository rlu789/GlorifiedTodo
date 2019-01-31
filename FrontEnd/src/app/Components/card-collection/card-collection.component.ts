import { Component, OnInit, Input } from '@angular/core';
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { CardsService, Card } from '../../Services/cards.service';
import { HttpErrorResponse } from "@angular/common/http";

import { ConfirmModalComponent } from '../../Modals/confirm-modal/confirm-modal.component';
import { EditCardModalComponent } from '../../Modals/edit-card-modal/edit-card-modal.component';
import { EditCollectionModalComponent } from '../../Modals/edit-collection-modal/edit-collection-modal.component';

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  dropDownColItems = [{ text: "Edit", icon: "fas fa-pen" }, { text: "Delete", icon: "fas fa-trash-alt" }];
  dropDownCardItems = [{ text: "Delete", icon: "fas fa-trash-alt" }];

  @Input('collectionData') collectionData: Array<CardCollection>;
  @Input('editable') editable: boolean;
  @Input('password') password: string;

  constructor(private cardsService: CardsService, private cardCollectionsService: CardCollectionsService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  dropDownColItemsFunc($event: string, collectionIndex: number) {
    switch ($event) {
      case this.dropDownColItems[0].text:
        const dialogRef = this.dialog.open(EditCollectionModalComponent, {
          width: '500px',
          data: { collection: this.collectionData[collectionIndex], password: this.password }
        });
        dialogRef.afterClosed().subscribe((data: CardCollection) => {
          this.collectionData[collectionIndex].title = data.title;
          this.collectionData[collectionIndex].color = data.color;
        });
        break;
      case this.dropDownColItems[1].text:
        this.deleteCol(collectionIndex);
        break;
    }
  }

  dropDownCardItemsFunc($event: string, collectionIndex: number, cardIndex: number) {
    switch ($event) {
      case this.dropDownCardItems[0].text:
        this.deleteCard(collectionIndex, cardIndex);
        break;
    }
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

  deleteCol(index: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      restoreFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardCollectionsService.remove(this.collectionData[index], this.password).subscribe((data: any) => {
          this.collectionData.splice(index, 1);
        }, (err: HttpErrorResponse) => {
        });
      }
    })
  }

  // OLD keep in case
  // deleteCol($event: { btnEvent: any, index: number }) {
  //   const dialogRef = this.dialog.open(ConfirmModalComponent, {
  //     width: '500px',
  //     restoreFocus: true
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.cardCollectionsService.remove(this.collectionData[$event.index], this.password).subscribe((data: any) => {
  //         this.collectionData.splice($event.index, 1);
  //         $event.btnEvent.complete();
  //       }, (err: HttpErrorResponse) => {
  //         $event.btnEvent.complete();
  //       });
  //     }
  //     else
  //       $event.btnEvent.complete();
  //   })
  // }

  deleteCard(collectionIndex: number, cardIndex: number) {
    var cardToBeDeleted = this.collectionData[collectionIndex].card[cardIndex];
    // console.log(cardToBeDeleted);
    this.cardsService.remove(cardToBeDeleted, this.password).subscribe((data: any) => {
      // console.log(data);
      this.collectionData[collectionIndex].card.splice(cardIndex, 1);
    })
  }

  addCard($event: { onCompleteEvent: Function, card: Card, index: number, collectionId: number }) {
    if (!this.collectionData[$event.index].card) this.collectionData[$event.index].card = [];
    this.cardsService.add($event.card, this.password).subscribe((data: Card) => {
      // console.log(data);
      this.collectionData[$event.index].card.push(data);
      $event.onCompleteEvent();
    }, (err: HttpErrorResponse) => {
    });
  }
}

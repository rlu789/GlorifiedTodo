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

  cardTitle: string;
  cardDesc: string;
  imgData: string;

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

  deleteCol($event, i: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      restoreFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardCollectionsService.remove(this.collectionData[i], this.password).subscribe((data: any) => {
          this.collectionData.splice(i, 1);
          $event.complete();
        }, (err: HttpErrorResponse) => {
          $event.complete();
        });
      }
      else
        $event.complete();
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

  addCard($event, i: number, id: number) {
    var c = new Card(this.cardTitle, this.cardDesc, id);
    if (this.imgData) {
      c.imgData = this.imgData;
    }
    if (!this.collectionData[i].card) this.collectionData[i].card = [];
    this.cardsService.add(c, this.password).subscribe((data: Card) => {
      // console.log(data);
      this.collectionData[i].card.push(data);
      this.cardDesc = '';
      this.cardTitle = '';
      this.imgData = '';
      $event.complete();
    }, (err: HttpErrorResponse) => {
      $event.complete();
    });
  }
}

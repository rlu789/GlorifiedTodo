import { Component, OnInit, Input } from '@angular/core';
import { CardCollectionsService, CardCollection } from '../../Services/card-collections.service';
import { CardsService, Card } from '../../Services/cards.service';
import { HttpErrorResponse } from "@angular/common/http";

import { ConfirmModalComponent } from '../../Modals/confirm-modal/confirm-modal.component';
import { EditCardModalComponent } from '../../Modals/edit-card-modal/edit-card-modal.component';

import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-card-collection',
  templateUrl: './card-collection.component.html',
  styleUrls: ['./card-collection.component.css']
})
export class CardCollectionComponent implements OnInit {
  @Input('collectionData') collectionData: Array<CardCollection>;

  cardTitle: string;
  cardDesc: string;

  constructor(private cardsService: CardsService, private cardCollectionsService: CardCollectionsService,
    public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
  }

  editCard(collectionIndex: number, cardIndex: number){
    var cardToBeEdited = this.collectionData[collectionIndex].card[cardIndex];
    // console.log(cardToBeEdited);
    
    const dialogRef = this.dialog.open(EditCardModalComponent, {
      width: '700px',
      data: {card: cardToBeEdited}
    });
    dialogRef.afterClosed().subscribe((card: Card) => {
      // move service call into modal????
      this.cardsService.update(card).subscribe((data: Card) => {
        this.collectionData[collectionIndex].card[cardIndex] = data;
        // console.log(data);
      })
    });
  }

  deleteCol(i: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cardCollectionsService.remove(this.collectionData[i]).subscribe((data: any) => {
          console.log(data);
          this.collectionData.splice(i, 1);
        }, (err: HttpErrorResponse) => {
          console.log(err);
          this.openSnackBar("To user: I.O.U one actual error message from dev");
        });
      }
    })
  }

  deleteCard(collectionIndex: number, cardIndex: number) {
    var cardToBeDeleted = this.collectionData[collectionIndex].card[cardIndex];
    console.log(cardToBeDeleted);
    this.collectionData[collectionIndex].card.splice(cardIndex, 1);
    this.cardsService.remove(cardToBeDeleted).subscribe((data: any) => {
      console.log(data);
    })
  }

  addCard(i: number, id: number) {
    var c = new Card(this.cardTitle, this.cardDesc, id);
    this.cardDesc = '';
    this.cardTitle = '';
    if (!this.collectionData[i].card) this.collectionData[i].card = [];
    this.cardsService.add(c).subscribe((data: Card) => {
      console.log(data);
      this.collectionData[i].card.push(data);
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.openSnackBar("To user: I.O.U one actual error message from dev");
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
}

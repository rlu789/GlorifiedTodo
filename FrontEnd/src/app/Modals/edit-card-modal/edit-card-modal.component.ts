import { Component, OnInit, Inject } from '@angular/core';
import { Card, CardsService } from '../../Services/cards.service';
import { HttpErrorResponse } from "@angular/common/http";

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-edit-card-modal',
  templateUrl: './edit-card-modal.component.html',
  styleUrls: ['./edit-card-modal.component.css']
})
export class EditCardModalComponent implements OnInit {
  tempCard: Card;
  password: string;

  constructor(public dialogRef: MatDialogRef<EditCardModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { card: Card, password: string }, 
      public cardsService: CardsService, public snackBar: MatSnackBar) {
    // console.log(data.card);
    this.tempCard = new Card(data.card.title, data.card.description, data.card.cardCollectionId);
    this.tempCard.id = data.card.id;
    this.password = data.password;
  }

  updateCard() {
    this.cardsService.update(this.tempCard, this.password).subscribe((data: Card) => {
      if (data) this.dialogRef.close(data);
    });
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}

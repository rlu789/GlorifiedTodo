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

  constructor(
    public dialogRef: MatDialogRef<EditCardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { card: Card }, public cardsService: CardsService,
    public snackBar: MatSnackBar) {
    // console.log(data.card);
    this.tempCard = new Card(data.card.title, data.card.description, data.card.cardCollectionId);
    this.tempCard.id = data.card.id;
  }

  updateCard() {
    this.cardsService.update(this.tempCard).subscribe((data: Card) => {
      if (data) this.dialogRef.close(data);
      else alert("WTF HAPPENED");
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.openSnackBar("To user: I.O.U one actual error message from dev");
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close');
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}

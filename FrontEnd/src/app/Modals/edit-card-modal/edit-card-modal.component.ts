import { Component, OnInit, Inject } from '@angular/core';
import { Card } from '../../Services/cards.service';

import { MatDialogRef, MAT_DIALOG_DATA, } from '@angular/material';

@Component({
  selector: 'app-edit-card-modal',
  templateUrl: './edit-card-modal.component.html',
  styleUrls: ['./edit-card-modal.component.css']
})
export class EditCardModalComponent implements OnInit {
  tempCard: Card;

  constructor(
    public dialogRef: MatDialogRef<EditCardModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {card: Card}) {
      // console.log(data.card);
      this.tempCard = new Card(data.card.title, data.card.description, data.card.cardCollectionId);
      this.tempCard.id = data.card.id;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}

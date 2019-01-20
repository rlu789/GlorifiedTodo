import { Component, OnInit, Inject } from '@angular/core';
import { Card, CardsService } from '../../Services/cards.service';
import { HttpErrorResponse } from "@angular/common/http";

import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Validators } from '@angular/forms';

import { CustomFormControl, CustomFormGroup } from '../../Custom/Base';

@Component({
  selector: 'app-edit-card-modal',
  templateUrl: './edit-card-modal.component.html',
  styleUrls: ['./edit-card-modal.component.css']
})
export class EditCardModalComponent implements OnInit {
  tempCard: Card;
  editable: boolean;
  password: string;

  title: CustomFormControl;
  description: CustomFormControl;
  group: CustomFormGroup;

  constructor(public dialogRef: MatDialogRef<EditCardModalComponent>, @Inject(MAT_DIALOG_DATA) public data: { card: Card, password: string, editable: boolean },
    public cardsService: CardsService, public snackBar: MatSnackBar) {
    // console.log(data.card);
    this.password = data.password;
    this.editable = data.editable;

    this.tempCard = new Card();
    this.tempCard.clone(data.card);
 
    this.title = new CustomFormControl({value: this.tempCard.title, disabled: !this.editable}, Validators.required);
    this.description = new CustomFormControl({value: this.tempCard.description, disabled: !this.editable}, Validators.required);
    this.group = new CustomFormGroup({
      title: this.title,
      description: this.description
    });

  }

  updateCard() {
    if (this.group.formSubmittable()) {
      this.tempCard.title = this.title.value;
      this.tempCard.description = this.description.value;
      this.cardsService.update(this.tempCard, this.password).subscribe((data: Card) => {
        if (data) this.dialogRef.close(data);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
  }

}

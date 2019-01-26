import { Component, OnInit, Inject } from '@angular/core';
import { CardCollection, CardCollectionsService } from '../../Services/card-collections.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomFormControl, CustomFormGroup, Constants } from '../../Custom/Base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-collection-modal',
  templateUrl: './edit-collection-modal.component.html',
  styleUrls: ['./edit-collection-modal.component.css']
})
export class EditCollectionModalComponent implements OnInit {
  tempCol: CardCollection;
  password: string;
  colTitle: CustomFormControl;
  colColor: string;
  boardColors = Constants.boardColors;

  constructor(public dialogRef: MatDialogRef<EditCollectionModalComponent>, private cardCollectionsService: CardCollectionsService,
    @Inject(MAT_DIALOG_DATA) public data: { collection: CardCollection, password: string }) {
      this.colTitle = new CustomFormControl(data.collection.title, Validators.required);
      this.colColor = data.collection.color;
      this.password = data.password;
      this.tempCol = new CardCollection(data.collection.title, data.collection.boardId, data.collection.color, data.collection.id);
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCol() {
    if (this.colTitle.controlSubmittable()) {
      this.tempCol.title = this.colTitle.value;
      this.tempCol.color = this.colColor;
      this.cardCollectionsService.update(this.tempCol, this.password).subscribe((data: CardCollection) => {
        this.dialogRef.close(data);
      });
    }
  }

}

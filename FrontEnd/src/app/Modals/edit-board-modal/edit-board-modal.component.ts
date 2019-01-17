import { Component, OnInit, Inject } from '@angular/core';
import { Board, BoardsService } from '../../Services/boards.service';
import { HttpErrorResponse } from "@angular/common/http";

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CustomValidators, CustomFormControl, CustomFormGroup } from '../../Custom/Base';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-board-modal',
  templateUrl: './edit-board-modal.component.html',
  styleUrls: ['./edit-board-modal.component.css']
})
export class EditBoardModalComponent implements OnInit {
  tempBoard: Board;
  boardCurrentPassword: string;

  title: CustomFormControl;
  passwordCtrl = new CustomFormControl('');
  passwordCtrlRepeat = new CustomFormControl('', CustomValidators.matchValidator(this.passwordCtrl));
  group: CustomFormGroup;

  constructor(public dialogRef: MatDialogRef<EditBoardModalComponent>, private boardsService: BoardsService,
    @Inject(MAT_DIALOG_DATA) public data: { board: Board, password: string }) {
    this.boardCurrentPassword = data.password;
    this.tempBoard = new Board();
    this.tempBoard.clone(data.board)

    this.title = new CustomFormControl(this.tempBoard.title, Validators.required);
    this.group = new CustomFormGroup({
      title: this.title,
      passwordCtrl: this.passwordCtrl,
      passwordCtrlRepeat: this.passwordCtrlRepeat
    });
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateBoard(): void {
    if (this.group.formSubmittable()) {
      this.tempBoard.title = this.title.value;
      this.tempBoard.password = this.passwordCtrl.value;
      this.boardsService.update(this.tempBoard, this.boardCurrentPassword).subscribe((data: Board) => {
        if (data) this.dialogRef.close({
          board: data,
          password: this.tempBoard.password
        });
      });
    }
  }
}

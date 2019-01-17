import { Component, OnInit, Inject } from '@angular/core';
import { Board, BoardsService } from '../../Services/boards.service';
import { HttpErrorResponse } from "@angular/common/http";

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl } from '@angular/forms';
import * as CustomValidators from '../../Custom/Validators';

@Component({
  selector: 'app-edit-board-modal',
  templateUrl: './edit-board-modal.component.html',
  styleUrls: ['./edit-board-modal.component.css']
})
export class EditBoardModalComponent implements OnInit {
  tempBoard: Board;
  boardCurrentPassword: string;
  passwordCtrl = new FormControl('');
  passwordCtrlRepeat = new FormControl('', CustomValidators.matchValidator(this.passwordCtrl));
  passwordCtrlRepeatFocus: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditBoardModalComponent>, private boardsService: BoardsService,
    @Inject(MAT_DIALOG_DATA) public data: { board: Board, password: string }) {
    this.boardCurrentPassword = data.password;
    this.tempBoard = new Board();
    this.tempBoard.clone(data.board)
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateBoard(): void {
    this.passwordCtrlRepeat.updateValueAndValidity();
    this.passwordCtrlRepeat.markAsDirty();
    this.passwordCtrlRepeat.markAsTouched();
    if (this.passwordCtrlRepeat.valid) {
      this.tempBoard.password = this.passwordCtrl.value;
      this.boardsService.update(this.tempBoard, this.boardCurrentPassword).subscribe((data: Board) => {
        if (data) this.dialogRef.close({
          board: data,
          password: this.tempBoard.password
        });
      });
    }
    else this.passwordCtrlRepeatFocus = true;
  }
}

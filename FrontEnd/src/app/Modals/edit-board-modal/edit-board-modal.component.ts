import { Component, OnInit, Inject } from '@angular/core';
import { Board, BoardsService } from '../../Services/boards.service';
import { HttpErrorResponse } from "@angular/common/http";

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-board-modal',
  templateUrl: './edit-board-modal.component.html',
  styleUrls: ['./edit-board-modal.component.css']
})
export class EditBoardModalComponent implements OnInit {
  tempBoard: Board;
  password: string;

  constructor(public dialogRef: MatDialogRef<EditBoardModalComponent>, private boardsService: BoardsService,
    @Inject(MAT_DIALOG_DATA) public data: { board: Board, password: string }) {
      this.password = data.password;
      this.tempBoard = new Board();
      this.tempBoard.clone(data.board)
  }

  ngOnInit() {
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  updateBoard(): void {
    this.boardsService.update(this.tempBoard, this.password).subscribe((data: Board) => {
      if (data) this.dialogRef.close({
        board: data,
        password: this.tempBoard.password
      });
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Board, BoardsService } from '../../Services/boards.service';
import { HttpErrorResponse } from "@angular/common/http";
import { ConfirmModalComponent } from '../../Modals/confirm-modal/confirm-modal.component';

import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = true;
  boardData: Array<Board>;
  boardTitle: string;
  boardPassword: string;

  constructor(private boardsService: BoardsService, public snackBar: MatSnackBar, private router: Router,
    public dialog: MatDialog) {
    boardsService.get().subscribe((data: Array<Board>) => {
      this.boardData = data;
      // console.log(this.boardData);
      this.loading = false;
    });
  }

  viewBoard(i: number) {
    this.router.navigate(['board', this.boardData[i].id]);
  }

  deleteBoard(i: number) {
    const dialogRef = this.dialog.open(ConfirmModalComponent, {
      width: '500px',
      data: { password: this.boardData[i].password },
      restoreFocus: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.boardsService.remove(this.boardData[i], result.password).subscribe((data: any) => {
          this.boardData.splice(i, 1);
        });
      }
    });
  }

  addBoard($event) {
    var board = new Board(this.boardTitle);
    this.boardTitle = '';

    if (this.boardPassword) {
      board.password = this.boardPassword;
      this.boardPassword = '';
    }
    this.boardsService.add(board).subscribe((data: any) => {
      this.boardData.push(data);
      $event.complete();
      // console.log(data);
    }, (err: HttpErrorResponse) => {
      $event.complete();
    });
  }

  ngOnInit() {
  }

}
